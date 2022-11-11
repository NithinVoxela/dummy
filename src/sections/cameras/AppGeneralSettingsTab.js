import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from "react";
// @mui
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  TextareaAutosize,  
  RadioGroup,
  Radio,
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
  userList: PropTypes.object
};

// ----------------------------------------------------------------------

export default function AppGeneralSettingsTab(props) {
  const { onCancel, translate, appId, currentCamera, handleSave, userList={}, setIsFormUpdated } = props;

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
    isPrivacyEnabled: false,
    severity: ""
  });
  const [mlApp, setMlApp] = useState(null);
  const [sensitivity, setSensitivity] = useState(80);
  const [desktopAlert, setDesktopAlert] = useState(false);
  const [mobileAlert, setMobileAlert] = useState(false);
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailList, setEmailList] = useState("");
  const [extraConfig, setExtraConfig] = useState("");
  const [desktopSubscribers, setDesktopSubscribers] = useState([]);
  const [mobileSubscribers, setMobileSubscribers] = useState([]);
  const [emailSubscribers, setEmailSubscribers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [severityValue, setSeverityValue] = useState('Low');

  const SEVERITY = [
    { value: 'High', label: translate('app.alert-high-label') },
    { value: 'Medium', label: translate('app.alert-medium-label') },
    { value: 'Low', label: translate('app.alert-low-label') },
  ];


  useEffect(() => {
    setCamera(currentCamera);
    const app = currentCamera.appDtos?.find((item) => item?.id?.toString() === appId);
    setMlApp(app);
    // eslint-disable-next-line radix
    setSensitivity(app?.config?.sensitivity ? parseInt(app.config.sensitivity * 100) : 0);
    setDesktopAlert(app?.config?.allowDesktopAlert);
    setEmail(app?.config?.allowEmailAlert);
    setMobileAlert(app?.config?.allowMobileAlert);
    setEmailList(app?.config?.notifyEmails);
    setExtraConfig(app?.config?.customJsonData);
    setIsPrivacyEnabled(app?.config?.isPrivacyEnabled || false);        
    setSeverityValue(app?.config?.severity || "Low");
  }, [currentCamera]);


  const handleSensitivityChange = (event, value) => {
    setSensitivity(value === "" ? "" : Number(value));
    setIsFormUpdated(true);
  };

  const handleDeskAlertChange = (event) => {
    setDesktopAlert(event.target.checked);
    setIsFormUpdated(true);
  };

  const handleMobileAlertChange = (event) => {
    setMobileAlert(event.target.checked);
    setIsFormUpdated(true);
  };

  const handleEmailAlertChange = (event) => {
    setEmail(event.target.checked);
    setIsFormUpdated(true);
  };

 
  const handleExtraConfigChange = (event) => {
    setExtraConfig(event.target.value);
    setIsFormUpdated(true);
  };

  const handlePrivacyChange = (evt) => {
    setIsPrivacyEnabled(evt.target.checked);
    setIsFormUpdated(true);
  };

  const handleDesktopSubscriber = (e, values) => {
    setDesktopSubscribers(values);
    setIsFormUpdated(true);
  };
  const handleMobileSubscriber = (e, values) => {
    setMobileSubscribers(values);
    setIsFormUpdated(true);
  };
  const handleEmailSubscriber = (e, values) => {
    setEmailSubscribers(values);
    setIsFormUpdated(true);
  }

  const handleRadioChange = (e, value) => {
    setSeverityValue(value);
    setIsFormUpdated(true);
  };

  useMemo(() => {
    if (userList?.data?.length > 0) {
      setSubscribers(userList?.data);
      if (mlApp) {
        setDesktopSubscribers(mlApp?.config?.deskTopSubscribers?.userDtos || []);
        setMobileSubscribers(mlApp?.config?.mobileSubscribers?.userDtos || []);
        setEmailSubscribers(mlApp?.config?.emailSubscribers?.userDtos || []);
      }
    }    
  }, [userList, mlApp]);

  const getSubscriberPayload = (list) => {
    const payload = [];
    if (list?.length > 0) {
      list.map(item => payload.push({ id: item.id }));
    }
    return payload; 
  } 

  const handleSubmit = () => {
    if (mlApp?.config) {

      const desktop = {
        "type" : "FIREBASE_DESKTOP",
        "userDtos" : getSubscriberPayload(desktopSubscribers)
      };

      const mobile = {
        "type" : "FIREBASE_MOBILE",
        "userDtos" : getSubscriberPayload(mobileSubscribers)
      };

      const emailSubList = {
        "type" : "EMAIL",
        "userDtos" : getSubscriberPayload(emailSubscribers)
      };
      const payload = {
        ...mlApp.config,
        cameraId: currentCamera?.publicId,
        appId: mlApp.app.id,
        sensitivity: sensitivity / 100,
        allowDesktopAlert: desktopAlert,
        allowMobileAlert: mobileAlert,
        allowEmailAlert: email,
        notifyEmails: emailList,
        customJsonData: extraConfig,
        isPrivacyEnabled,
        emailSubscribers: emailSubList,
        mobileSubscribers: mobile,
        deskTopSubscribers: desktop,
        severity: severityValue
      };      
      handleSave(payload);    
      setIsFormUpdated(false);  
    }
  };

  const isDisabled = () => {
    if ((desktopAlert && desktopSubscribers?.length === 0) || (mobileAlert && mobileSubscribers?.length === 0) || (email && emailSubscribers?.length === 0)) {
      return true;
    }
    return false;
  };


  const renderAutoComplete = (handler, value, label, type) => (
    
      <FormControlLabel
        control={
          <Autocomplete            
            multiple            
            size="small"
            sx={{ minWidth: 300, ml: 1 }}
            onChange={handler}
            options={subscribers || []}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            renderTags={(value, getTagProps) => value.map((option, index) => (
                <Chip {...getTagProps({ index })} key={`${type}-${option.id}`} size="small" label={`${option.firstName} ${option.lastName}`} />
              ))
            }
            renderInput={(params) => <TextField label="" {...params} error={value.length === 0} helperText={value.length === 0 ? translate('app.subscriber-validation-label'): ""} />}
            value={value}
          />
        }
        label={`${translate(label)}:`}
        labelPlacement="start"
        sx={{ ml: 5, mb: 2, justifyContent: "start" }}
      />         
  );

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
            step={1}
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
            {translate('app.alerts-severity-label')}:{' '}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleRadioChange}
            value={severityValue}
          >
            {SEVERITY.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />)}            
          </RadioGroup>          
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
          { desktopAlert && renderAutoComplete(handleDesktopSubscriber, desktopSubscribers, 'app.camera-desktop-subscribers-label', 'desktop') }
           <FormControlLabel
            control={
              <Checkbox
                checked={mobileAlert}
                onChange={handleMobileAlertChange}
                name="desktop"               
              />
            }
            label={translate('app.camera-mobile-label')}
          />
          { mobileAlert && renderAutoComplete(handleMobileSubscriber, mobileSubscribers, 'app.camera-mobile-subscribers-label', 'mobile') }          
          <FormControlLabel
            control={<Checkbox checked={email} onChange={handleEmailAlertChange} name="email" />}
            label={translate('app.camera-email-label')}
          />
          { email && renderAutoComplete(handleEmailSubscriber, emailSubscribers, 'app.camera-email-subscribers-label', 'email') }          
        </FormControl>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
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
          <Button disabled={isDisabled()} onClick={() => handleSubmit()} variant="contained">
            {translate('app.camera-save-label')}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
