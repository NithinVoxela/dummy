import { useCallback, useEffect, useState } from 'react';
import { capitalCase } from 'change-case';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCameraDetails, getAppSchedule, resetSchedule, updateCameraApp, updateAppSchedule } from '../../redux/slices/cameras';

// sections
import { AppGeneralSettingsTab } from '../../sections/cameras';
import AppScheduleTab from '../../sections/cameras/AppScheduleTab';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const CameraAppSettings = () => {
  const { themeStretch } = useSettings();
  const { cameraId = '', appId = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [mlApp, setMlApp] = useState(null);
  const { cameraDetails, schedularList } = useSelector((state) => state.cameras);

  const [currentTab, setCurrentTab] = useState('general');

  const getCamera = useCallback(async () => {
    try {
      await dispatch(getCameraDetails(cameraId));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  const getCameraAppSchedule = async() => {
    try {
      await dispatch(getAppSchedule({appId}));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  };

  const resetCameraAppSchedule = () => {
    resetSchedule();
  }

  const handleSaveApp = useCallback(async (payload) => {
    try {
      await dispatch(updateCameraApp(payload));
      enqueueSnackbar(translate('app.camera-app-update-success'));
      navigate(`${PATH_DASHBOARD.cameras.root}/apps/${cameraId}`);
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  const updateAppScheduleRequest = useCallback(async (payload) => {
    try {
      await dispatch(updateAppSchedule(payload));
      enqueueSnackbar(translate('app.schedule-updated-label'));   
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  useEffect(() => {
    if (cameraId) {
      getCamera();
    }
  }, [cameraId]);

  useEffect(() => {
    if (cameraDetails?.publicId) {
      const app = cameraDetails?.appDtos?.find((item) => item?.id?.toString() === appId);
      setMlApp(app);
    }
  }, [cameraDetails]);

  useEffect(() => {
    return () => {      
      resetCameraAppSchedule();     
    };
  }, []);
  

  const onCancel = () => {
    navigate(`${PATH_DASHBOARD.cameras.root}/apps/${cameraId}`);
  };

  const handleTabChange = (e, value) => {
    setCurrentTab(value);
    if (value === 'general') {
      getCamera();
    } else if (value === 'schedule') {
      getCameraAppSchedule();
    }
  }


  const APP_TABS = [
    {
      value: 'general',
      label: translate('app.camera-app-general-tab'),
      icon: <Iconify icon={'codicon:settings'} width={20} height={20} />,
      component: (
        <AppGeneralSettingsTab
          currentCamera={cameraDetails}
          translate={translate}
          handleSave={handleSaveApp}
          onCancel={onCancel}
          appId={appId}          
        />
      ),
    },
    {
      value: 'schedule',
      label: translate('app.camera-app-schedule-tab'),
      icon: <Iconify icon={'mdi:calendar-clock'} width={20} height={20} />,
      component: (
        <AppScheduleTab
          translate={translate}
          updateAppScheduleRequest={updateAppScheduleRequest}          
          appId={appId}
          schedularList={schedularList}
          resetSchedule={resetCameraAppSchedule}
          onCancel={onCancel}
        />
      ),
    },
  ];

  const cameraName = cameraDetails?.name ? capitalCase(cameraDetails?.name) : '';

  return (
    <Page title={`${translate('app.alert-camera-details')} : ${translate('app.camera-apps-header-label')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.camera-apps-header-label')}
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.alert-camera-details')}`, href: PATH_DASHBOARD.general.cameras },
            {
              name: `${cameraName}`,
              href: `${PATH_DASHBOARD.cameras.root}/apps/${cameraId}`,
            },
            { name: mlApp?.app?.name || '' },
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleTabChange}
        >
          {APP_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.label)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 1 }} />

        {APP_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
};

export default CameraAppSettings;
