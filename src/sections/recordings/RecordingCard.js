import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils

// components
import Label from '../../components/Label';
import Image from '../../components/Image';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
import { formatEpochTime } from '../../utils/formatTime';
import CameraName from '../cameras/CameraName';

const useStyles = makeStyles({
  root: {
    '& :not(style)+:not(style)': {
      marginTop: '0px !important',
    },
  },
});

// ----------------------------------------------------------------------

RecordingCard.propTypes = {
  recording: PropTypes.object,
};

export default function RecordingCard({ recording }) {
  const { user } = useAuth();
  const { id, cameraApp, recordingTime, thumbnailUrl, streamUrl, hasRead } = recording;
  const cameraName = cameraApp.camera.name;
  const { translate } = useLocales();
  const classes = useStyles();

  const linkTo = `${PATH_DASHBOARD.recordings.root}/detail/${id}`;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {!hasRead && (
          <Label
            variant="filled"
            color="info"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {translate('app.alert-new')}
          </Label>
        )}

        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Image alt={cameraName} src={thumbnailUrl} ratio="1/1" />
        </Link>
      </Box>

      <Stack spacing={2} sx={{ p: 2 }} className={classes.root}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
            {recordingTime ? formatEpochTime(recordingTime, user?.timezone) : ''}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
            <b>{translate('app.alert-camera-details')}:</b> <CameraName cameraName={cameraName} streamUrl={streamUrl} />
          </Typography>
        </Stack>

        <Typography variant="subtitle2" noWrap>
          <b>{translate('app.alert-location-details')}:</b> {cameraApp.camera.location}
        </Typography>
      </Stack>
    </Card>
  );
}
