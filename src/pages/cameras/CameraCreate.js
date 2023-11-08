import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Container } from '@mui/material';
// routes
import { useCallback, useEffect } from 'react';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCameraDetails, resetCameraDetails, saveCamera, updateCamera } from '../../redux/slices/cameras';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CameraNewForm } from '../../sections/cameras';

// ----------------------------------------------------------------------

export default function CameraCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { cameraId = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = pathname.includes('edit');

  const { cameraDetails } = useSelector((state) => state.cameras);

  const getCamera = useCallback(async () => {
    try {
      dispatch(getCameraDetails(cameraId, { requireAgent: true, requireCameraSettings: true }));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  const handleSaveCamera = useCallback(
    async (payload = {}) => {
      try {
        if (!isEdit) {
          dispatch(saveCamera(payload));
        } else {
          dispatch(updateCamera(payload));
        }
        enqueueSnackbar(!isEdit ? translate('app.camera-add-success') : translate('app.camera-update-success'));
        navigate(PATH_DASHBOARD.cameras.list);
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
    if (cameraId && isEdit) {
      getCamera();
    }
  }, [cameraId]);

  useEffect(
    () => () => {
      dispatch(resetCameraDetails());
    },
    []
  );

  const onCancel = () => {
    navigate(PATH_DASHBOARD.cameras.list);
  };

  const cameraName = cameraDetails?.name ? cameraDetails.name : '';
  return (
    <Page title={`${translate('app.alert-camera-details')} : ${translate('app.alert-new-camera-label')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('app.camera-add-header-label')}` : `${translate('app.camera-edit-header-label')}`
          }
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.alert-camera-details')}`, href: PATH_DASHBOARD.general.cameras },
            { name: !isEdit ? `${translate('app.alert-new-camera-label')}` : cameraName },
          ]}
        />

        <CameraNewForm
          isEdit={isEdit}
          currentCamera={cameraDetails}
          translate={translate}
          handleSave={handleSaveCamera}
          onCancel={onCancel}
        />
      </Container>
    </Page>
  );
}
