import { Typography, Grid, Box, Card, Link, Chip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import AirlineSeatFlatAngledIcon from "@material-ui/icons/AirlineSeatFlatAngled";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import { capitalize } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { NavLink as RouterNavLink, useHistory } from "react-router-dom";

import { translationService } from "services/translation/translation.service";
import { SEVERITY_COLORS } from "src/Constants";
import * as actions from "store/alert/alert.actions";
import { getDashboardAlerts, getCameraAlerts } from "store/alert/alert.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

interface IDispatchToProps {
  getDashboardAlertRequest: typeof actions.getDashboardAlertRequest;
  getDashboardCameraAlertRequest: typeof actions.getDashboardCameraAlertRequest;
  cleanAlertLogs: typeof actions.cleanAlertLogs;
}

interface IStateToProps {
  dashboardAlertLog: any;
  dashboardCameraAlert: any;
}

interface IProps
  extends IStateToProps,
    IDispatchToProps,
    WithStyles<typeof styles>,
    RouteComponentProps<{ id: string }> {}

const DashboardComponent: React.FC<IProps> = ({
  classes,
  getDashboardAlertRequest,
  getDashboardCameraAlertRequest,
  cleanAlertLogs,
  dashboardAlertLog,
  dashboardCameraAlert
}) => {
  const history = useHistory();

  const handleCardClick = id => {
    if (id) {
      history.push(`/alerts/${id}`);
    }
  };

  useEffect(() => {
    getDashboardAlertRequest();
  }, [getDashboardAlertRequest]);

  useEffect(() => {
    getDashboardCameraAlertRequest();
  }, [getDashboardCameraAlertRequest]);

  useEffect(() => {
    return () => {
      cleanAlertLogs();
    };
  }, [cleanAlertLogs]);

  const renderIcon = type => {
    if (type === "Vehicle Detection") {
      return <DriveEtaOutlinedIcon fontSize="large" />;
    } else if (type === "Fall Detection") {
      return <AirlineSeatFlatAngledIcon fontSize="large" />;
    } else if (type === "Person Detection") {
      return <AccountBoxOutlinedIcon fontSize="large" />;
    } else {
      return <WbSunnyOutlinedIcon fontSize="large" />;
    }
  };

  const renderLatetAlerts = (item, prefix) => {
    return (
      <Grid item xs={2} key={`${prefix}-${item?.alertId}`}>
        <Card className={item?.alertId ? classes.card : classes.root} onClick={() => handleCardClick(item?.alertId)}>
          <CardContent style={{ textAlign: "center" }}>
            <Box style={{ display: "flex", justifyContent: "flex-end", minHeight: 25 }}>
              <Typography component="div" className={classes.severity}>
                {item?.severity && (
                  <Chip
                    label={capitalize(item?.severity)}
                    style={{ backgroundColor: SEVERITY_COLORS[capitalize(item?.severity)], color: "#fff" }}
                    size="small"
                  />
                )}
              </Typography>
            </Box>
            <Box style={{ display: "flex", justifyContent: "center", minHeight: 25 }}>{renderIcon(item?.appName)}</Box>
            <Typography color="textSecondary" variant="button" gutterBottom>
              {item?.cameraName}
            </Typography>

            <Typography color="textSecondary">
              {item?.appName || translationService.getMessageTranslation("no-activity-label", "Dashboard")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Helmet title="Alerts" />
      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            {translationService.getMessageTranslation("dashboard-header-label", "Dashboard")}
          </Typography>
        </Grid>
      </Grid>
      <Box style={{ marginTop: 16 }}>
        <Typography variant="h6" gutterBottom display="inline">
          {translationService.getMessageTranslation("camera-notifications-header-label", "Notifications")}
        </Typography>
      </Box>
      <Box style={{ marginTop: 8, width: "100%" }}>
        {dashboardAlertLog?.length > 0 ? (
          <Grid container spacing={3}>
            {dashboardAlertLog.map((item: any) => renderLatetAlerts(item, "latest-alert"))}
          </Grid>
        ) : (
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body2" gutterBottom display="inline">
              {translationService.getMessageTranslation("camera-no-data-label", "No data found.")}
            </Typography>
          </Box>
        )}
      </Box>
      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6" gutterBottom display="inline">
          {translationService.getMessageTranslation("alert-cameras-label", "Cameras")}
        </Typography>
      </Box>
      <Box style={{ marginTop: 8, width: "100%" }}>
        {dashboardCameraAlert?.length > 0 ? (
          <Grid container spacing={3}>
            {dashboardCameraAlert.map((item: any) => renderLatetAlerts(item, "camera-alert"))}
          </Grid>
        ) : (
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body2" gutterBottom display="inline">
              {translationService.getMessageTranslation("camera-no-data-label", "No data found.")}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

const mapDispatchToProps = {
  getDashboardAlertRequest: actions.getDashboardAlertRequest,
  getDashboardCameraAlertRequest: actions.getDashboardCameraAlertRequest,
  cleanAlertLogs: actions.cleanAlertLogs
};

const mapStateToProps = (state: IApplicationState) => ({
  dashboardAlertLog: getDashboardAlerts(state),
  dashboardCameraAlert: getCameraAlerts(state)
});

export const Dashboard = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(DashboardComponent))
);
