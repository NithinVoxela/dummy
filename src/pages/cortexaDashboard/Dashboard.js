import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Card, Container, Grid, Typography, Box, CardContent } from '@mui/material';
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AirlineSeatFlatAngledIcon from "@mui/icons-material/AirlineSeatFlatAngled";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getDashboardAlertLog, getDashboardCameraAlertLog, cleanDashboardAlertLogs } from '../../redux/slices/alerts';
// sections
import { VideoPreview } from "../../sections/cameras";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function Dashboard() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { dashboardAlerts, dashboardCameraAlerts } = useSelector((state) => state.alerts);

  const handleCardClick = id => {
    if (id) {
      navigate(`${PATH_DASHBOARD.alerts.root}/detail/${id}`);
    }
  };

  const getColor = (severity) => {
    const value = severity?.toLowerCase();
    if (value === "high") {
      return "error";
    }
    
    if (value === "medium") {
      return "warning";
    } 
    return "info";    
  };

  const getDashboardAlertRequest = useCallback(async() => {
    try {      
      await dispatch(getDashboardAlertLog());      
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const getDashboardCameraAlertRequest = useCallback(async() => {
    try {      
      await dispatch(getDashboardCameraAlertLog());      
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const cleanAlertLogs = useCallback(async() => {
    try {      
      await dispatch(cleanDashboardAlertLogs());      
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getDashboardAlertRequest();
  }, [getDashboardAlertRequest]);

  useEffect(() => {
    getDashboardCameraAlertRequest();
  }, [getDashboardCameraAlertRequest]);

  useEffect(() => () => {
      cleanAlertLogs();
    }, [cleanAlertLogs]);

  const getActivityName = (activity) => {
    if (activity) {
      return translate(`app.app-name-${activity.toLowerCase()}`) || activity;
    }
    return translate('app.no-activity-label');
  }  

  const renderIcon = type => {
    if (type === "motion") {
      return <DirectionsWalkIcon fontSize="large" />;
    } if (type === "fall") {
      return <AirlineSeatFlatAngledIcon fontSize="large" />;
    } if (type === "person") {
      return <AccountBoxOutlinedIcon fontSize="large" />;
    } if (type === "wakeup") {
      return <AccessibilityNewOutlinedIcon fontSize="large" />;
    } 
    return <WbSunnyOutlinedIcon fontSize="large" />;
    
  };

  const renderLatetAlerts = (item, prefix, index) => (
      <Grid item xs={6} md={3} xl={2} key={`${prefix}-${item?.cameraId}-${index}`}>
        <VideoPreview 
          name={item?.name}
          thumbnailUrl={item?.thumbnailUrl}
          mediaUrl={item?.mediaUrl}         
          childCmp={(
            <Card sx={{ cursor: item.alertId ? "pointer" : "default" }} onClick={() => handleCardClick(item?.alertId)}>
              <CardContent style={{ textAlign: "center", padding: 8 }}>
                <Box style={{ display: "flex", justifyContent: "flex-end", minHeight: 25 }}>
                  <Typography component="div">
                    {item?.severity && (
                      <Label
                        variant="filled"
                        color={getColor(item?.severity)}
                        sx={{
                          textTransform: 'uppercase',
                        }}
                      >
                        {item?.severity}
                      </Label>
                    )}
                  </Typography>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center", minHeight: 25 }}>{renderIcon(item?.displayName?.toLowerCase())}</Box>
                <Typography color="textSecondary" variant="button" gutterBottom>
                  {item?.cameraName}
                </Typography>
    
                <Typography color="textSecondary">
                  {getActivityName(item?.displayName)}
                </Typography>
              </CardContent>
            </Card>
          )}
        />
      </Grid>
    );

  return (
    <Page title={translate('app.dashboard-header-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid justify="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h4" gutterBottom display="inline">
              {translate('app.dashboard-header-label')}
            </Typography>
          </Grid>
        </Grid>
        <Box style={{ marginTop: 16 }}>
          <Typography variant="h6" gutterBottom display="inline">
            {translate('app.camera-notifications-header-label')}
          </Typography>
        </Box>
        <Box style={{ marginTop: 8, width: '100%' }}>
          {dashboardAlerts?.data?.length > 0 ? (
            <Grid container spacing={3}>
              {dashboardAlerts.data.map((item, index) => renderLatetAlerts(item, 'latest-alert', index))}
            </Grid>
          ) : (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" gutterBottom display="inline">
                {translate('app.notification-no-data-label')}
              </Typography>
            </Box>
          )}
        </Box>
        <Box style={{ marginTop: 24 }}>
          <Typography variant="h6" gutterBottom display="inline">
            {translate('app.alert-cameras-label')}
          </Typography>
        </Box>
        <Box style={{ marginTop: 8, width: '100%' }}>
          {dashboardCameraAlerts?.data?.length > 0 ? (
            <Grid container spacing={3}>
              {dashboardCameraAlerts.data.map((item, index) => renderLatetAlerts(item, 'camera-alert', index))}
            </Grid>
          ) : (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" gutterBottom display="inline">
                {translate('app.camera-no-data-label')}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default Dashboard;
