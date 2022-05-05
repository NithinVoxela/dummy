import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
// @mui
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Slider,
  Stack,
  Switch,
  TextareaAutosize,
} from '@mui/material';
// components

// ----------------------------------------------------------------------

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

AppGeneralSettingsTab.propTypes = {
  currentCamera: PropTypes.object,
  translate: PropTypes.func,
  handleSave: PropTypes.func,
  onCancel: PropTypes.func,
  appId: PropTypes.string,
};

// ----------------------------------------------------------------------

export default function AppGeneralSettingsTab(props) {
  const { onCancel, translate, appId, currentCamera, handleSave } = props;

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
 
  useEffect(() => {
    setCamera(currentCamera);
    const app = currentCamera.appDtos?.find((item) => item?.id?.toString() === appId);
    setMlApp(app);
    // eslint-disable-next-line radix
    setSensitivity(app?.config?.sensitivity ? parseInt(app.config.sensitivity * 100) : 0);
    setDesktopAlert(app?.config?.allowDesktopAlert);
    setEmail(app?.config?.allowEmailAlert);
    setEmailList(app?.config?.notifyEmails);
    setExtraConfig(app?.config?.customJsonData);
    setIsPrivacyEnabled(app?.config?.isPrivacyEnabled || false);
  }, [currentCamera]);


  const handleSensitivityChange = (event, value) => {
    setSensitivity(value === "" ? "" : Number(value));
  };

  const handleDeskAlertChange = (event) => {
    setDesktopAlert(event.target.checked);
  };

  const handleEmailAlertChange = (event) => {
    setEmail(event.target.checked);
  };

  const handleEmailListChange = (event) => {
    setEmailList(event.target.value);
  };

  const handleExtraConfigChange = (event) => {
    setExtraConfig(event.target.value);
  };

  const handlePrivacyChange = (evt) => {
    setIsPrivacyEnabled(evt.target.checked);
  };

  const handleSubmit = () => {
    if (mlApp?.config) {
      const payload = {
        ...mlApp.config,
        cameraId: currentCamera?.publicId,
        appId: mlApp.app.id,
        sensitivity: sensitivity / 100,
        allowDesktopAlert: desktopAlert,
        allowEmailAlert: email,
        notifyEmails: emailList,
        customJsonData: extraConfig,
        isPrivacyEnabled
      };
      handleSave(payload);      
    }
  };



  return (
    <Card sx={{ padding: "24px 40px" }}>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary">
            {translate('app.camera-sensitivity-header-label')}:{' '}
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
      <Box sx={{ mt: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary">
            {translate('app.camera-privacy-label', 'Privacy')}:{' '}
          </FormLabel>
          <FormControlLabel
            control={
              <Switch checked={isPrivacyEnabled} onChange={handlePrivacyChange} color="primary" name="privacy" />
            }
            label={
              isPrivacyEnabled ? translate('app.camera-privacy-enabled-label') : translate('app.camera-privacy-disabled-label')
            }
          />
        </FormControl>
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary">
            {translate('app.camera-notifications-header-label')}:{' '}
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={desktopAlert}
                onChange={handleDeskAlertChange}
                name="desktop"               
              />
            }
            label={translate('app.camera-desktop-label')}
          />
          <FormControlLabel
            control={<Checkbox checked={email} onChange={handleEmailAlertChange} name="email" />}
            label={translate('app.camera-email-label')}
          />
          <FormControlLabel
            control={
              <TextareaAutosize
                aria-label="email-list"
                minRows={3}
                value={emailList}
                style={{ minHeight: 30, marginLeft: 8, minWidth: 350 }}
                disabled={!email}
                onChange={handleEmailListChange}
              />
            }
            label={`${translate('app.camera-email-address-label')}:`}
            labelPlacement="start"
          />
        </FormControl>
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary">
            {translate('app.camera-extra-config-label')}:{' '}
          </FormLabel>
          <TextareaAutosize
            aria-label="extra-config"
            minRows={3}
            value={extraConfig}
            style={{ minHeight: 30, minWidth: 350, marginTop: 8 }}
            onChange={handleExtraConfigChange}
          />
        </FormControl>
      </Box>
      <Stack spacing={3} alignItems="flex-end">
        <Box sx={{ display: 'flex' }}>
          <Button onClick={onCancel} sx={{ mr: 1 }}>
            {translate('app.camera-cancel-label')}
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {translate('app.camera-save-label')}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
