import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCameraDetails, addCameraApp, updateCameraApp } from '../../redux/slices/cameras';

// sections
import { CameraAppsCard } from '../../sections/cameras';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const CameraApps = () => {
  const { themeStretch } = useSettings();
  const { cameraId = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { cameraDetails } = useSelector((state) => state.cameras);

  const getCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getCameraDetails(cameraId));
      setIsLoading(false);
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  const handleAppEnable = useCallback(
    async (item) => {
      try {
        await dispatch(getCameraDetails(cameraId));
        if (item?.config) {
          const payload = { ...item.config, cameraId, appId: item.app.id, isEnabled: !item.config.isEnabled };
          await dispatch(updateCameraApp(payload));
        } else {
          const payload = {
            cameraId,
            app: {
              id: item.app.id,
              name: item.app.name,
              description: item.app.description,
              url: item.app.url,
              version: 0,
            },
          };
          await dispatch(addCameraApp(payload));
        }
        enqueueSnackbar(translate('app.camera-app-update-success'));
        getCamera();
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

  const cameraName = cameraDetails?.name ? cameraDetails.name : '';

  const handleAppsClick = (item) => {
    navigate(`${PATH_DASHBOARD.cameras.root}/apps/${cameraId}/settings/${item.id}`);
  };

  return (
    <Page title={`${translate('app.alert-camera-details')} : ${translate('app.camera-apps-header-label')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.camera-apps-header-label')}
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.alert-camera-details')}`, href: PATH_DASHBOARD.general.cameras },
            { name: cameraName },
          ]}
        />

        <CameraAppsCard
          loading={isLoading}
          translate={translate}
          dataList={cameraDetails?.appDtos || []}
          handleAppsClick={handleAppsClick}
          handleAppEnable={handleAppEnable}
        />
      </Container>
    </Page>
  );
};

export default CameraApps;
