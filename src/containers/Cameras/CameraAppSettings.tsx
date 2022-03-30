/* eslint-disable complexity */
import { Paper, Box, Checkbox, Button, FormControl } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/core/Slider";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { useHistory } from "react-router-dom";

import { ICameraDataModel } from "models/cameraData.model";
import { translationService } from "services/translation/translation.service";
import * as actions from "store/camera/camera.actions";
import { getCamera } from "store/camera/camera.selector";
import { getRedirectTo } from "store/redirect/redirect.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

const marks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 100,
    label: "100"
  }
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

const CameraAppSettingsComponent: React.FC<IProps> = ({
  classes,
  getCameraRequest,
  updateCameraAppRequest,
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
    appDtos: [],
    isPrivacyEnabled: false
  });
  const [mlApp, setMlApp] = useState(null);
  const [sensitivity, setSensitivity] = useState(80);
  const [desktopAlert, setDesktopAlert] = useState(false);
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailList, setEmailList] = useState("");
  const [extraConfig, setExtraConfig] = useState("");
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
    setIsPrivacyEnabled(app?.config?.isPrivacyEnabled || false);
  }, [cameraInfo]);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  const handleSensitivityChange = (event: any, value) => {
    setSensitivity(value === "" ? "" : Number(value));
  };

  const handleDeskAlertChange = (event: any) => {
    setDesktopAlert(event.target.checked);
  };

  const handleEmailAlertChange = (event: any) => {
    setEmail(event.target.checked);
  };

  const handleEmailListChange = (event: any) => {
    setEmailList(event.target.value);
  };

  const handleExtraConfigChange = (event: any) => {
    setExtraConfig(event.target.value);
  };

  const handlePrivacyChange = (evt: Event) => {
    setIsPrivacyEnabled(evt.target.checked);
  };

  const handleAppEnable = () => {
    if (mlApp?.config) {
      const payload = {
        ...mlApp.config,
        cameraId: id,
        appId: mlApp.app.id,
        sensitivity: sensitivity / 100,
        allowDesktopAlert: desktopAlert,
        allowEmailAlert: email,
        notifyEmails: emailList,
        customJsonData: extraConfig,
        isPrivacyEnabled
      };
      updateCameraAppRequest(payload);
      history.push(`/camera/${id}/apps`);
    }
  };

  const handleCancel = () => {
    history.push(`/camera/${id}/apps`);
  };

  return (
    <Paper className={classes.appSettingform}>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary" classes={{ root: classes.fieldLable }}>
            {translationService.getMessageTranslation("camera-sensitivity-header-label", "Sensitivity")}:{" "}
          </FormLabel>
          <Slider
            defaultValue={80}
            aria-labelledby="discrete-slider-always"
            step={10}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleSensitivityChange}
            style={{ width: 200 }}
            value={sensitivity}
          />
        </FormControl>
      </Box>
      <Box className={classes.appNotifications}>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary" classes={{ root: classes.fieldLable }}>
            {translationService.getMessageTranslation("camera-privacy-label", "Privacy")}:{" "}
          </FormLabel>
          <FormControlLabel
            control={
              <Switch checked={isPrivacyEnabled} onChange={handlePrivacyChange} color="primary" name="privacy" />
            }
            label={
              isPrivacyEnabled
                ? translationService.getMessageTranslation("camera-privacy-enabled-label", "Enabled")
                : translationService.getMessageTranslation("camera-privacy-disabled-label", "Disabled")
            }
          />
        </FormControl>
      </Box>
      <Box className={classes.appNotifications}>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary" classes={{ root: classes.fieldLable }}>
            {translationService.getMessageTranslation("camera-notifications-header-label", "Notifications")}:{" "}
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={desktopAlert}
                onChange={handleDeskAlertChange}
                name="desktop"
                classes={{ root: classes.checkbox }}
              />
            }
            label={translationService.getMessageTranslation("camera-desktop-label", "Desktop Alert")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={email}
                onChange={handleEmailAlertChange}
                name="email"
                classes={{ root: classes.checkbox }}
              />
            }
            label={translationService.getMessageTranslation("camera-email-label", "Email")}
          />
          <FormControlLabel
            control={
              <TextareaAutosize
                aria-label="email-list"
                minRows={3}
                value={emailList}
                style={{ minHeight: 50, marginLeft: 8, minWidth: 250 }}
                disabled={!email}
                onChange={handleEmailListChange}
              />
            }
            label={translationService.getMessageTranslation("camera-email-address-label", "List of Email Addresses")}
            labelPlacement="start"
          />
        </FormControl>
      </Box>
      <Box className={classes.appNotifications}>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary" classes={{ root: classes.fieldLable }}>
            {translationService.getMessageTranslation("camera-extra-config-label", "Extra Config")}:{" "}
          </FormLabel>
          <TextareaAutosize
            aria-label="extra-config"
            minRows={3}
            value={extraConfig}
            style={{ minHeight: 50, minWidth: 250, marginTop: 8 }}
            onChange={handleExtraConfigChange}
          />
        </FormControl>
      </Box>
      <Box mt={6}>
        <Button
          color="primary"
          size="medium"
          variant="contained"
          className={classes.saveButton}
          onClick={handleAppEnable}
        >
          {translationService.getMessageTranslation("camera-save-label", "Save")}
        </Button>
        <Button color="primary" size="medium" variant="outlined" className={classes.saveButton} onClick={handleCancel}>
          {translationService.getMessageTranslation("camera-cancel-label", "Cancel")}
        </Button>
      </Box>
    </Paper>
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

export const CameraAppSettings = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(CameraAppSettingsComponent))
);
