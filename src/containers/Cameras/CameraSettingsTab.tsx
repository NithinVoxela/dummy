/* eslint-disable complexity */
import { Typography, Grid, Breadcrumbs, Divider, Link, Tab, Tabs } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { NavLink as RouterNavLink, useHistory } from "react-router-dom";

import { ICameraDataModel } from "models/cameraData.model";
import { translationService } from "services/translation/translation.service";
import * as actions from "store/camera/camera.actions";
import { getCamera } from "store/camera/camera.selector";
import { getRedirectTo } from "store/redirect/redirect.selector";
import { IApplicationState } from "store/state.model";

import { SchedularTab } from "./SchedularTab";
import { CameraAppSettings } from "./CameraAppSettings";
import { styles } from "./styles";

const NavLink = React.forwardRef((props, ref) => <RouterNavLink innerRef={ref} {...props} />);

const tabs = [
  { label: "General", value: "general" },
  { label: "Schedule", value: "schedule" }
];

interface IDispatchToProps {
  registerCameraRequest: typeof actions.registerCameraRequest;
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

const CameraAppSettingsTabComponent: React.FC<IProps> = ({
  classes,
  getCameraRequest,
  redirectTo,
  camera: cameraInfo,
  match: {
    params: { id, appId }
  }
}) => {
  const isAddMode = !id;
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
  const [mlApp, setMlApp] = useState(null);
  const [sensitivity, setSensitivity] = useState(80);
  const [desktopAlert, setDesktopAlert] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailList, setEmailList] = useState("");
  const [extraConfig, setExtraConfig] = useState("");
  const [currentTab, setCurrentTab] = useState("general");
  const history = useHistory();

  useEffect(() => {
    !isAddMode && getCameraRequest({ publicId: id });
  }, [getCameraRequest, id, isAddMode]);
  useEffect(() => {
    setCamera(cameraInfo);
    const app = cameraInfo.appDtos?.find((item: any) => item?.id == appId);
    setMlApp(app);
    setSensitivity(app?.config?.sensitivity ? parseInt(app.config.sensitivity * 100) : 0);
    setDesktopAlert(app?.config?.allowDesktopAlert);
    setEmail(app?.config?.allowEmailAlert);
    setEmailList(app?.config?.notifyEmails);
    setExtraConfig(app?.config?.customJsonData);
  }, [cameraInfo]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <>
      <Helmet title="Cameras" />
      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            {translationService.getMessageTranslation("cameras-header-label", "Cameras")}
          </Typography>

          <Breadcrumbs>
            <Link component={NavLink} exact to="/cameras">
              Camera List
            </Link>
            <Link component={NavLink} exact to={`/camera/${id}/apps`}>
              {translationService.getMessageTranslation("camera-apps-header-label", "Camera Apps")}
            </Link>
            <Typography>{mlApp?.app?.name || ""}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="primary"
        value={currentTab}
        variant="scrollable"
        style={{ marginTop: 8 }}
      >
        {tabs.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      <Divider style={{ marginBottom: 16 }} />
      {currentTab === "general" && <CameraAppSettings />}
      {currentTab === "schedule" && <SchedularTab />}
    </>
  );
};

const mapDispatchToProps = {
  registerCameraRequest: actions.registerCameraRequest,
  getCameraRequest: actions.getCameraRequest,
  updateCameraAppRequest: actions.updateCameraAppRequest
};

const mapStateToProps = (state: IApplicationState) => ({
  camera: getCamera(state),
  redirectTo: getRedirectTo(state)
});

export const CameraAppSettingsTab = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(CameraAppSettingsTabComponent))
);
