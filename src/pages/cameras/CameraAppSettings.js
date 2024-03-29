import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
// @mui
import { Container, Tab, Box, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
import usePrompt from '../../hooks/usePrompt';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';
import ConfirmationModalConfig from '../../components/widgets/ConfirmationModalConfig';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getCameraDetails,
  getAppSchedule,
  resetSchedule,
  updateCameraApp,
  updateAppSchedule,
} from '../../redux/slices/cameras';

// sections
import { AppGeneralSettingsTab, AnnotationTab, RecordingGeneralSettingsTab } from '../../sections/cameras';
import AppScheduleTab from '../../sections/cameras/AppScheduleTab';
import {
  PERSON_APP_CODE,
  WAKEUP_APP_CODE,
  FALL_APP_CODE,
  REGION_EXIT_APP_CODE,
  RECORDING_APP_CODE,
} from '../../sections/common/CommonConstants';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const CameraAppSettings = () => {
  const { themeStretch } = useSettings();
  const { cameraId = '', appId = '', appCode = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const theme = useTheme();
  const [mlApp, setMlApp] = useState(null);
  const [isFormUpdated, setIsFormUpdated] = useState(false);
  const { cameraDetails, schedularList } = useSelector((state) => state.cameras);

  const [currentTab, setCurrentTab] = useState('general');

  const getCamera = useCallback(async () => {
    try {
      dispatch(getCameraDetails(cameraId, { requireCameraAppConfigs: true }));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  const getCameraAppSchedule = async () => {
    try {
      await dispatch(getAppSchedule({ appId }));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  };

  const resetCameraAppSchedule = () => {
    resetSchedule();
  };

  const handleSaveApp = useCallback(
    async (payload) => {
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
    },
    [dispatch]
  );

  const updateAppScheduleRequest = useCallback(
    async (payload) => {
      try {
        await dispatch(updateAppSchedule(payload));
        enqueueSnackbar(translate('app.schedule-updated-label'));
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
        throw new Error(err?.message);
      }
    },
    [dispatch]
  );
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
      setIsFormUpdated(false);
    };
  }, []);

  const handleTabConfirmation = async () => {
    const config = ConfirmationModalConfig(theme);
    const settings = { ...config };
    settings.confirmationButtonProps.color = 'error';
    settings.confirmationText = translate('app.leave-btn-label');
    settings.cancellationText = translate('app.camera-cancel-label');
    settings.title = (
      <Typography color="textPrimary" variant="h6">
        {translate('app.annotation-confirmation-label')}
      </Typography>
    );

    try {
      await confirm({
        ...settings,
        description: translate('app.annotation-confirmation-text-label'),
      });
      setIsFormUpdated(false);
      return true;
    } catch (err) {
      return false;
    }
  };
  const onCancel = async () => {
    if (currentTab === 'region' || (currentTab === 'schedule' && isFormUpdated)) {
      const canNaviagte = await handleTabConfirmation();
      if (canNaviagte) {
        navigate(`${PATH_DASHBOARD.cameras.root}/apps/${cameraId}`);
      }
    } else {
      navigate(`${PATH_DASHBOARD.cameras.root}/apps/${cameraId}`);
    }
  };

  const handleTabChange = async (e, value) => {
    let canNaviagte = true;
    if (isFormUpdated) {
      canNaviagte = await handleTabConfirmation();
    }
    if (canNaviagte) {
      setCurrentTab(value);
      setIsFormUpdated(false);
      if (value === 'general') {
        getCamera();
      } else if (value === 'schedule') {
        getCameraAppSchedule();
      }
    }
  };

  const isBlocking = () => isFormUpdated;

  const getAppTabs = () => {
    const APP_TABS = [];
    if (
      appCode === PERSON_APP_CODE ||
      appCode === WAKEUP_APP_CODE ||
      appCode === FALL_APP_CODE ||
      appCode === REGION_EXIT_APP_CODE
    ) {
      APP_TABS.push({
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
            appCode={appCode}
            setIsFormUpdated={setIsFormUpdated}
          />
        ),
      });
    } else if (appCode === RECORDING_APP_CODE) {
      APP_TABS.push({
        value: 'general',
        label: translate('app.camera-app-general-tab'),
        icon: <Iconify icon={'codicon:settings'} width={20} height={20} />,
        component: (
          <RecordingGeneralSettingsTab
            currentCamera={cameraDetails}
            translate={translate}
            handleSave={handleSaveApp}
            onCancel={onCancel}
            appId={appId}
            setIsFormUpdated={setIsFormUpdated}
          />
        ),
      });
    }

    if (
      appCode === PERSON_APP_CODE ||
      appCode === WAKEUP_APP_CODE ||
      appCode === FALL_APP_CODE ||
      appCode === REGION_EXIT_APP_CODE
    ) {
      APP_TABS.push({
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
            setIsFormUpdated={setIsFormUpdated}
          />
        ),
      });
      APP_TABS.push({
        value: 'region',
        label: translate('app.camera-region-of-intrest'),
        icon: <Iconify icon={'carbon:area-custom'} width={20} height={20} />,
        component: (
          <AnnotationTab
            translate={translate}
            handleSave={handleSaveApp}
            currentCamera={cameraDetails}
            appId={appId}
            onCancel={onCancel}
            setIsFormUpdated={setIsFormUpdated}
            camId={cameraId}
          />
        ),
      });
    }

    return APP_TABS;
  };

  const APP_TABS = getAppTabs();

  const cameraName = cameraDetails?.name ? cameraDetails.name : '';
  usePrompt(translate('app.annotation-confirmation-text-label'), isBlocking());

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
            <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
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
