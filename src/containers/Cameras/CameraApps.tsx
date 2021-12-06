import { Typography, Grid, Breadcrumbs, Divider, FormControlLabel, Link, Box, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { green } from "@material-ui/core/colors";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import * as React from "react";
import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { useHistory, RouteComponentProps, withRouter } from "react-router";
import { NavLink as RouterNavLink } from "react-router-dom";

import { ICameraDataModel } from "models/cameraData.model";
import { translationService } from "services/translation/translation.service";
import * as actions from "store/camera/camera.actions";
import { getCamera } from "store/camera/camera.selector";
import { getRedirectTo } from "store/redirect/redirect.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

const NavLink = React.forwardRef((props, ref) => <RouterNavLink innerRef={ref} {...props} />);

const GreenSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    "&$checked": {
      color: green[500]
    },
    "&$checked + $track": {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {},
  thumb: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
  }
})(Switch);

interface IDispatchToProps {
  addCameraAppRequest: typeof actions.addCameraAppRequest;
  getCameraRequest: typeof actions.getCameraRequest;
  updateCameraAppRequest: typeof actions.updateCameraAppRequest;
}

interface IStateToProps {
  redirectTo: string;
  camera: ICameraDataModel;
}

interface IProps
  extends IStateToProps,
    IDispatchToProps,
    WithStyles<typeof styles>,
    RouteComponentProps<{ id: string }> {}

const CameraAppsComponent: React.FC<IProps> = ({
  classes,
  getCameraRequest,
  updateCameraAppRequest,
  addCameraAppRequest,
  camera: cameraInfo,
  match: {
    params: { id }
  }
}) => {
  const [camera, setCamera] = useState({
    name: "",
    description: "",
    cameraType: "",
    brand: "",
    model: "",
    streamUrl: "",
    passPhrase: "",
    location: "",
    installationDate: "",
    appDtos: []
  });
  const history = useHistory();
  useEffect(() => {
    getCameraRequest({ publicId: id });
  }, [getCameraRequest, id]);
  useEffect(() => {
    setCamera(cameraInfo);
  }, [cameraInfo]);

  const handleAppEnable = (item: any) => {
    if (item?.config) {
      const payload = { ...item.config, cameraId: id, appId: item.app.id, isEnabled: !item.config.isEnabled };
      updateCameraAppRequest(payload);
    } else {
      const payload = {
        cameraId: id,
        app: {
          id: item.app.id,
          name: item.app.name,
          description: item.app.description,
          url: item.app.url,
          version: 0
        }
      };
      addCameraAppRequest(payload);
    }
  };

  const handleAppsClick = (item: any) => () => {
    history.push(`/camera/${id}/apps/${item.id}/settings`);
  };

  const isAppEnabled = (item: any) => {
    return item.config ? item.config.isEnabled : false;
  };

  const renderAppCard = (item: any) => {
    return (
      <Grid item md={3} xs={12} key={`${item.app.id}`}>
        <Card className={classes.appCard}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.app.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.app.description}
            </Typography>
          </CardContent>
          <CardActions style={{ padding: "8px 16px", justifyContent: "space-between" }}>
            {!item.config && (
              <Button variant="contained" color="primary" onClick={() => handleAppEnable(item)} size="small">
                {translationService.getMessageTranslation("camera-subscribe-label", "Subscribe")}
              </Button>
            )}
            {item.config && (
              <>
                <FormControlLabel
                  control={
                    <GreenSwitch
                      name={item.app.name}
                      value={isAppEnabled(item)}
                      checked={isAppEnabled(item)}
                      onChange={() => handleAppEnable(item)}
                    />
                  }
                  label={translationService.getMessageTranslation("camera-active-label", "Active")}
                />
                <Button size="small" color="primary" onClick={handleAppsClick(item)}>
                  {translationService.getMessageTranslation("camera-settings-label", "Settings")}
                </Button>
              </>
            )}
          </CardActions>
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
            {translationService.getMessageTranslation("cameras-header-label", "Cameras")}
          </Typography>

          <Breadcrumbs>
            <Link component={NavLink} exact to="/cameras">
              {translationService.getMessageTranslation("camera-list-header-label", "Camera List")}
            </Link>
            <Typography>
              {translationService.getMessageTranslation("camera-apps-header-label", "Camera Apps")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      {camera?.appDtos?.length > 0 && <Grid container>{camera.appDtos.map(renderAppCard)}</Grid>}
      {camera?.appDtos?.length === 0 && (
        <Box className={classes.noData}>
          <Typography variant="body2">{translationService.getMessageTranslation("camera-no-data-label", "No data found.")}</Typography>
        </Box>
      )}
    </>
  );
};

const mapDispatchToProps = {
  addCameraAppRequest: actions.addCameraAppRequest,
  getCameraRequest: actions.getCameraRequest,
  updateCameraAppRequest: actions.updateCameraAppRequest
};

const mapStateToProps = (state: IApplicationState) => ({
  camera: getCamera(state),
  redirectTo: getRedirectTo(state)
});

export const CameraApps = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(CameraAppsComponent))
);
