import { useCallback, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { has } from "lodash";
// @mui
import {
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
import { AuthContext } from '../../contexts/JWTContext';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { formatUTCDateString } from '../../utils/formatTime';
import Label from '../../components/Label';
import CameraName from '../../sections/cameras/CameraName';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUnreadAlertCount, getAlertDetails, markAsRead } from '../../redux/slices/alerts';



// sections


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

const AlertDetail = () => {
  const authContext = useContext(AuthContext);
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
      await dispatch(getUnreadAlertCount());
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

  const getTypeLabel = (activity) => {
    if (activity) {
      return translate(`app.app-name-${activity.toLowerCase()}`) || activity;
    }
    return "-";
  }  


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
                  <CameraName cameraName={alertDetails?.cameraName} streamUrl={alertDetails?.streamUrl}/>
                </Typography>
              </div>
            </Grid>
            <Grid item md={3} xs={12} >
              <div>
                <Typography color="textPrimary" variant="subtitle2">
                  {translate('app.alert-created-on-details').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }} >
                  {alertDetails?.alertTime ? formatUTCDateString(alertDetails.alertTime, authContext?.user?.timezone) : '-'}
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
                  {translate('app.activity-type').toUpperCase()}
                </Typography>
                <Typography color="textPrimary" variant="body1" sx={{ pt: 0.5 }}>
                  {getTypeLabel(alertDetails?.type)}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ mt: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
          <ReactPlayer controls muted playsinline width="640px" height="320px" url={alertDetails?.mediaUrl} />
        </Card>
      </Container>
    </Page>
  );
}


export default AlertDetail;