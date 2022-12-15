import { useCallback, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { has } from 'lodash';
// @mui
import { Button, Card, Container, Grid, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import { AuthContext } from '../../contexts/JWTContext';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { epochToLocalDateTime } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getRecordingDetails, patch } from '../../redux/slices/recordings';

const RecordingDetail = () => {
  const authContext = useContext(AuthContext);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { recordingId } = useParams();

  const { recordingDetails } = useSelector((state) => state.recordings);

  const getRecordingData = useCallback(async () => {
    try {
      const queryParams = {
        requireVideoUrl: true,
      };
      await dispatch(getRecordingDetails(recordingId, queryParams));
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const markAsReadRequest = useCallback(
    async (id) => {
      try {
        const payload = {
          id,
          hasRead: true,
        };
        await dispatch(patch(payload));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getRecordingData();
  }, []);

  useEffect(() => {
    if (has(recordingDetails, 'hasRead')) {
      if (!recordingDetails.hasRead) {
        markAsReadRequest(recordingDetails.id);
      }
    }
  }, [recordingDetails]);

  const openStreamUrl = (streamUrl) => {
    window.open(streamUrl, '_blank');
  };

  const renderDate = (dateValue) => {
    if (dateValue) {
      return epochToLocalDateTime(dateValue, authContext?.user?.timezone);
    }

    return null;
  };

  const renderCameraName = () => (
    <>
      {recordingDetails?.streamUrl?.trim()?.length > 0 ? (
        <Button color="primary" size="small" onClick={() => openStreamUrl(recordingDetails?.streamUrl)}>
          {recordingDetails?.cameraApp?.camera.name}
          <Iconify icon={'ic:sharp-launch'} />
        </Button>
      ) : (
        <>{recordingDetails?.cameraApp?.camera.name}</>
      )}
    </>
  );

  return (
    <Page title={translate('app.recordings-details-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.recordings-list-label')}
          links={[
            { name: translate('app.dashboard-header-label'), href: PATH_DASHBOARD.root },
            { name: translate('app.recordings-label'), href: PATH_DASHBOARD.general.recordings },
            { name: translate('app.recordings-details-label') },
          ]}
        />

        <Card sx={{ padding: '24px 16px' }}>
          <Grid container>
            <Grid item md={2} xs={12}>
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.alert-location-details').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }}>
                  {recordingDetails?.cameraApp?.camera.location || '-'}
                </Typography>
              </div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.alert-camera-details').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }}>
                  {renderCameraName()}
                </Typography>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.recordings-created-on-details').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }}>
                  {recordingDetails?.recordingTime ? renderDate(recordingDetails.recordingTime) : '-'}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ mt: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <ReactPlayer controls muted playsinline width="640px" height="320px" url={recordingDetails?.recordingUrl} />
        </Card>
      </Container>
    </Page>
  );
};

export default RecordingDetail;
