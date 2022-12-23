import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { has } from 'lodash';
// @mui
import { Card, Container, Grid, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CameraName from '../../sections/cameras/CameraName';
import { formatEpochTime } from '../../utils/formatTime';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getRecordingDetails, patch } from '../../redux/slices/recordings';

const RecordingDetail = () => {
  const { user } = useAuth();
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
                  <CameraName
                    cameraName={recordingDetails?.cameraApp?.camera.name}
                    streamUrl={recordingDetails?.streamUrl}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.recordings-created-on-details').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }}>
                  {recordingDetails?.recordingTime
                    ? formatEpochTime(recordingDetails?.recordingTime, user?.timezone)
                    : '-'}
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
