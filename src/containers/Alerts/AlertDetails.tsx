import { Button, Typography, Grid, Breadcrumbs, Divider, Card, Link, Chip, CardMedia } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import * as React from "react";
import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { NavLink as RouterNavLink } from "react-router-dom";

import { IAlertDataModel } from "models/alertData.model";
import { translationService } from "services/translation/translation.service";
import { SEVERITY_COLORS } from "src/Constants";
import { formatDateInWords } from "src/helpers/dateTime";
import { isImageURL } from "src/helpers/fileType";
import * as actions from "store/alert/alert.actions";
import { getAlert } from "store/alert/alert.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

interface IDispatchToProps {
  getAlertRequest: typeof actions.getAlertRequest;
  markAsReadRequest: typeof actions.markAsReadRequest;
}

interface IStateToProps {
  alert: IAlertDataModel;
}

interface IProps
  extends IStateToProps,
    IDispatchToProps,
    WithStyles<typeof styles>,
    RouteComponentProps<{ id: string }> {}

const NavLink = React.forwardRef((props, ref) => <RouterNavLink innerRef={ref} {...props} />);

const AlertDetailsComponent: React.FC<IProps> = ({
  classes,
  getAlertRequest,
  markAsReadRequest,
  alert: alertInfo,
  match: {
    params: { id }
  }
}) => {
  const [alert, setAlert] = useState({});
  useEffect(() => {
    getAlertRequest({ publicId: id });
  }, [getAlertRequest, id]);
  useEffect(() => {
    setAlert(alertInfo);
  }, [alertInfo]);

  useEffect(() => {
    if (alert.hasOwnProperty("hasRead") && !alert.hasRead) {
      markAsReadRequest({ id });
    }
  }, [alert]);

  const openStreamUrl = (streamUrl: string) => {
    window.open(streamUrl, "_blank");
  };

  const type = isImageURL(alert?.fileName) ? "image" : "video";
  const mediaUrl = alert?.preSignedUrl;
  const cameraName = alert?.cameraName || "-";
  const streamUrl = alert?.streamUrl;

  const renderCameraName = () => (
    <>
      {streamUrl?.trim()?.length > 0 ? (
        <Button color="primary" size="small" className={classes.linkBtn} onClick={() => openStreamUrl(streamUrl)}>
          {cameraName}
          <LaunchOutlinedIcon color="primary" fontSize="small" style={{ fontSize: 14, marginLeft: 2, marginTop: 2 }} />
        </Button>
      ) : (
        <>{cameraName}</>
      )}
    </>
  );

  return (
    <>
      <Helmet title="Alerts" />
      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            {translationService.getMessageTranslation("alerts-header-label", "Alerts")}
          </Typography>

          <Breadcrumbs>
            <Link component={NavLink} exact to="/alerts">
              {translationService.getMessageTranslation("alerts-header-label", "Alert List")}
            </Link>
            <Typography>{translationService.getMessageTranslation("alerts-details-label", "Alert Details")}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Card>
        <Grid container>
          <Grid item md={2} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                {translationService.getMessageTranslation("alert-location-details", "LOCATION").toUpperCase()}
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                {alert?.cameraLocation || "-"}
              </Typography>
            </div>
          </Grid>
          <Grid item md={2} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                {translationService.getMessageTranslation("alert-camera-details", "CAMERA").toUpperCase()}
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                {renderCameraName()}
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                {translationService.getMessageTranslation("alert-created-on-details", "ALERT CREATED ON")}
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                {alert?.alertTime ? formatDateInWords(alert.alertTime) : "-"}
              </Typography>
            </div>
          </Grid>
          <Grid item md={2} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                {translationService.getMessageTranslation("alerts-severity-label", "SEVERITY").toUpperCase()}
              </Typography>
              <Typography component="p" className={classes.alertSummaryValue}>
                <Chip
                  label={alert?.severity || "-"}
                  style={{ backgroundColor: SEVERITY_COLORS.High, color: "#fff", minWidth: 75 }}
                  size="medium"
                />
              </Typography>
            </div>
          </Grid>
          <Grid item md={2} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                {translationService.getMessageTranslation("camera-type-label", "TYPE").toUpperCase()}
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                {translationService.getMessageTranslation(`alerts-${alert?.type?.toLowerCase()}-label`, alert?.type) ||
                  "-"}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card className={classes.mediaCard}>
        <ReactPlayer controls muted playsinline width="100%" height="100%" url={mediaUrl} />
      </Card>
    </>
  );
};

const mapDispatchToProps = {
  getAlertRequest: actions.getAlertRequest,
  markAsReadRequest: actions.markAsRead
};

const mapStateToProps = (state: IApplicationState) => ({
  alert: getAlert(state)
});

export const AlertDetails = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(AlertDetailsComponent))
);
