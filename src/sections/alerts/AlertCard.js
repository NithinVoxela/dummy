import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Box, Card, Link, Typography, Stack, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EmergencyRecordingOutlinedIcon from '@mui/icons-material/EmergencyRecordingOutlined';
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import DeleteModal from '../../components/widgets/DeleteModal';
import DialogModal from '../../components/widgets/DialogModal';
import CameraName from '../cameras/CameraName';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
import { formatUTCDateString } from '../../utils/formatTime';
import { dispatch } from '../../redux/store';
import { deleteAlert, patchAlert } from '../../redux/slices/alerts';
import { ADMIN_ROLES } from '../common/CommonConstants';
import ListMenu, { ICON } from '../common/ListMenu';

const useStyles = makeStyles({
  root: {
    '& :not(style)+:not(style)': {
      marginTop: '0px !important',
    },
  },
});

// ----------------------------------------------------------------------

AlertCard.propTypes = {
  alert: PropTypes.object,
};

export default function AlertCard({ alert, handlePageRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [showDialogModal, setShowDialogModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { id, cameraName, alertTime, preSignedUrl, severity, streamUrl, cameraLocation, hasRead, type, isArchived } =
    alert;
  const { translate } = useLocales();
  const classes = useStyles();
  const navigate = useNavigate();

  const linkTo = `${PATH_DASHBOARD.alerts.root}/detail/${id}`;
  const getColor = () => {
    if (severity === 'High') {
      return 'error';
    }

    if (severity === 'Medium') {
      return 'warning';
    }
    return 'info';
  };

  const getActivityName = (activity) => {
    if (activity) {
      return translate(`app.app-name-${activity.toLowerCase()}`) || activity;
    }
    return '-';
  };

  const showWarningModal = () => {
    setShowModal(true);
  };

  const showWarningDialogModal = () => {
    setShowDialogModal(true);
  };

  const handleDelete = useCallback(
    async (alertId) => {
      try {
        dispatch(deleteAlert(alertId));
        enqueueSnackbar(translate('app.alert-delete-success'));
        setShowModal(false);
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
      }
    },
    [dispatch]
  );

  const handleFullClip = () => {
    navigate(`${PATH_DASHBOARD.recordings.list}`, { state: { cameraName, alertTime } });
  };

  const handleArchive = useCallback(
    async (alertId, value) => {
      try {
        const payload = { id: alertId, isArchived: value };
        await patchAlert(payload);
        enqueueSnackbar(translate(`app.alert-${value ? 'archive' : 'unarchive'}-success`));
        setShowDialogModal(false);
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
      }
      handlePageRefresh();
    },
    [dispatch]
  );

  const getMenuItems = () => {
    return (
      <>
        <MenuItem onClick={() => showWarningDialogModal()}>
          <EmergencyRecordingOutlinedIcon sx={{ ...ICON }} />
          {translate('app.full-clip-label')}
        </MenuItem>
        <MenuItem onClick={() => handleArchive(id, !isArchived)}>
          <BookmarksTwoToneIcon sx={{ ...ICON }} />
          {translate(`app.${isArchived ? 'unarchive' : 'archive'}-label`)}
        </MenuItem>
        {ADMIN_ROLES.includes(user?.role) && (
          <MenuItem onClick={() => showWarningModal(id)} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
            {translate('app.camera-delete-label')}
          </MenuItem>
        )}
      </>
    );
  };

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
          <Image alt={cameraName} src={preSignedUrl} ratio="1/1" />
        </Link>
      </Box>

      <Stack spacing={2} sx={{ p: 2 }} className={classes.root}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
            {alertTime ? formatUTCDateString(alertTime, user?.timezone) : ''}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            {severity && (
              <Label
                variant="filled"
                color={getColor()}
                sx={{
                  textTransform: 'uppercase',
                }}
              >
                {severity}
              </Label>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
            <b>{translate('app.alert-camera-details')}:</b> <CameraName cameraName={cameraName} streamUrl={streamUrl} />
          </Typography>
        </Stack>

        <Typography variant="subtitle2" noWrap>
          <b>{translate('app.alert-location-details')}:</b> {cameraLocation}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
            <b>{translate('app.activity-type')}:</b> {getActivityName(type)}
          </Typography>
          <ListMenu sx={{ mr: 1, width: 20, height: 20 }} getMenuItems={() => getMenuItems()} />
        </Stack>
      </Stack>
      <DeleteModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        type="Alert"
        recordId={id}
        handleDelete={handleDelete}
      />
      <DialogModal
        isOpen={showDialogModal}
        handleClose={() => setShowDialogModal(false)}
        promptText={translate('app.full-clip-prompt')}
        type={translate('app.full-clip-label')}
        handleConfirm={handleFullClip}
        icon={<Iconify icon={'feather:video'} />}
      />
    </Card>
  );
}
