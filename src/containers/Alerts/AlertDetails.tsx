import { Typography, Grid, Breadcrumbs, Divider, Card, Link, Chip, CardMedia, Button } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { NavLink as RouterNavLink } from "react-router-dom";

import { IAlertDataModel } from "models/alertData.model";
import { translationService } from "services/translation/translation.service";
import { SEVERITY_COLORS } from "src/Constants";
import { isImageURL } from "src/helpers/fileType";
import * as actions from "store/alert/alert.actions";
import { getAlert } from "store/alert/alert.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

interface IDispatchToProps {
  getAlertRequest: typeof actions.getAlertRequest;
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

  const type = isImageURL(alert?.fileName) ? "image" : "video";
  const mediaUrl = alert?.mediaUrl;
  return (
    <>
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
                LOCATION
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                -
              </Typography>
            </div>
          </Grid>
          <Grid item md={2} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                CAMERA
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                -
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                ALERT CREATED ON
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                -
              </Typography>
            </div>
          </Grid>
          <Grid item md={2} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                SEVERITY
              </Typography>
              <Typography component="p" className={classes.alertSummaryValue}>
                <Chip
                  label="High"
                  style={{ backgroundColor: SEVERITY_COLORS.High, color: "#fff", minWidth: 75 }}
                  size="medium"
                />
              </Typography>
            </div>
          </Grid>
          <Grid item md={2} xs={12} className={classes.alertSummary}>
            <div>
              <Typography color="textPrimary" variant="h6">
                TYPE
              </Typography>
              <Typography color="textPrimary" variant="body1" className={classes.alertSummaryValue}>
                -
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card className={classes.mediaCard}>
        <CardMedia className={classes[type]} component={type} controls image={mediaUrl} />
      </Card>
    </>
  );
};

const mapDispatchToProps = {
  getAlertRequest: actions.getAlertRequest
};

const mapStateToProps = (state: IApplicationState) => ({
  alert: getAlert(state)
});

export const AlertDetails = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(AlertDetailsComponent))
);
