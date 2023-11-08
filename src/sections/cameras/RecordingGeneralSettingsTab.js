import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Box, Button, Card, Stack, FormControl, FormLabel, TextField } from '@mui/material';

import useAuth from '../../hooks/useAuth';

RecordingGeneralSettingsTab.propTypes = {
  currentCamera: PropTypes.object,
  translate: PropTypes.func,
  handleSave: PropTypes.func,
  onCancel: PropTypes.func,
  appId: PropTypes.string,
};

// ----------------------------------------------------------------------

export default function RecordingGeneralSettingsTab(props) {
  const { onCancel, translate, appId, currentCamera, handleSave, setIsFormUpdated } = props;

  const [camera, setCamera] = useState({
    name: '',
    description: '',
    cameraType: '',
    brand: '',
    model: '',
    streamUrl: '',
    location: '',
    installationDate: '',
    appDtos: [],
    isPrivacyEnabled: false,
    severity: '',
  });
  const [mlApp, setMlApp] = useState(null);
  const [duration, setDuration] = useState(null);
  const [bitrate, setBitrate] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    setCamera(currentCamera);
    const app = currentCamera.appDtos?.find((item) => item?.id?.toString() === appId);
    setMlApp(app);
    setDuration(app?.config?.appSettings?.duration);
    setBitrate(app?.config?.appSettings?.bitrate);
  }, [currentCamera]);

  const handleDurationChange = (event) => {
    setDuration(event?.target?.value && !Number.isNaN(+event.target.value) ? Number(event.target.value) : null);
    setIsFormUpdated(true);
  };

  const handleBitrateChange = (event) => {
    setBitrate(event?.target?.value && !Number.isNaN(+event.target.value) ? Number(event.target.value) : null);
    setIsFormUpdated(true);
  };

  const handleSubmit = () => {
    if (mlApp?.config) {
      const payload = {
        ...mlApp.config,
        cameraId: currentCamera?.publicId,
        appId: mlApp.app.id,
        appSettings: {
          ...mlApp.config?.appSettings,
          duration,
          bitrate,
        },
      };
      handleSave(payload);
      setIsFormUpdated(false);
    }
  };

  const isDisabled = () => {
    return false;
  };

  return (
    <Card sx={{ padding: '24px 40px' }}>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <FormControl component="fieldset">
          <FormLabel component="label" color="primary">
            {translate('app.recording-duration-label')}:{' '}
          </FormLabel>
          <TextField aria-label="Duration" value={duration} onChange={handleDurationChange} />
        </FormControl>
      </Box>
      {user?.role === 'SUPER_ADMIN' && (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <FormControl component="fieldset">
            <FormLabel component="label" color="primary">
              {translate('app.recording-bitrate-label')}:{' '}
            </FormLabel>
            <TextField aria-label="Bitrate" value={bitrate} onChange={handleBitrateChange} />
          </FormControl>
        </Box>
      )}

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
