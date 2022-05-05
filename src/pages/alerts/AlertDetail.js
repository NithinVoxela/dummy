import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { has } from "lodash";
// @mui
import {
  Button,
  Card,  
  Container,
  Grid,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { fDateTimeTZSuffix } from '../../utils/formatTime';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAlertDetails, markAsRead } from '../../redux/slices/alerts';



// sections


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

const AlertDetail = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { alertId } = useParams();
 
  const { alertDetails } = useSelector((state) => state.alerts);

  const getAlertData = useCallback(async() => {
    try {      
      await dispatch(getAlertDetails(alertId));      
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const getColor = (severity) => {
    if (severity === "High") {
      return "error";
    }
    
    if (severity === "Medium") {
      return "warning";
    } 
    return "info";    
  };

  const markAsReadRequest = useCallback(async(id) => {
    try {      
      await dispatch(markAsRead(id));      
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getAlertData();
  }, []);

  useEffect(() => {
    if (has(alertDetails, "hasRead")) {
      if (!alertDetails.hasRead) {
       markAsReadRequest(alertDetails.id);
      }
    }
  }, [alertDetails]);

  const openStreamUrl = (streamUrl) => {
    window.open(streamUrl, "_blank");
  };

  const renderCameraName = () => (
    <>
      {alertDetails?.streamUrl?.trim()?.length > 0 ? (
        <Button color="primary" size="small" onClick={() => openStreamUrl(alertDetails?.streamUrl)}>
          {alertDetails?.cameraName}
          <Iconify icon={'ic:sharp-launch'} />
        </Button>
      ) : (
        <>{alertDetails?.cameraName}</>
      )}
    </>
  );

  const getTypeLabel = () => translate(`app.alerts-${alertDetails?.type?.toLowerCase()}-label`, alertDetails?.type ) || '-'


  return (
    <Page title={translate('app.alerts-details-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.alerts-list-label')}
          links={[
            { name: translate('app.dashboard-header-label'), href: PATH_DASHBOARD.root },
            { name: translate('app.alerts-header-label'), href: PATH_DASHBOARD.general.alerts },
            { name: translate('app.alerts-details-label') },
          ]}
        />

        <Card sx={{ padding: "24px 16px"}}>
          <Grid container>
            <Grid item md={2} xs={12}>
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate("app.alert-location-details").toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }}>
                  {alertDetails?.cameraLocation || '-'}
                </Typography>
              </div>
            </Grid>
            <Grid item md={2} xs={12} >
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.alert-camera-details').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }} >
                  {renderCameraName()}
                </Typography>
              </div>
            </Grid>
            <Grid item md={3} xs={12} >
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.alert-created-on-details').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }} >
                  {alertDetails?.alertTime ? fDateTimeTZSuffix(alertDetails.alertTime) : '-'}
                </Typography>
              </div>
            </Grid>
            <Grid item md={2} xs={12} >
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.alerts-severity-label').toUpperCase()}
                </Typography>
                <Typography component="p" sx={{ pt: 0.5 }}>
                  <Label
                    variant="filled"
                    color={getColor(alertDetails?.severity)}
                    sx={{
                      textTransform: 'uppercase',
                    }}
                  >
                    {alertDetails?.severity}
                  </Label>
                </Typography>
              </div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.camera-type-label').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }}>
                  {getTypeLabel()}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ mt: 3 }}>
          <ReactPlayer controls muted playsinline width="100%" height="100%" url={alertDetails?.mediaUrl} />
        </Card>
      </Container>
    </Page>
  );
}


export default AlertDetail;