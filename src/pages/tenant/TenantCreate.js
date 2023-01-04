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
import { getTenantDetails, resetTenantDetails, saveTenant, patchTenant } from '../../redux/slices/tenants';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import TenantNewForm from '../../sections/tenants/TenantNewForm';

// ----------------------------------------------------------------------

export default function TenantCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { tenantId = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = pathname.includes('edit');

  const { tenantDetails } = useSelector((state) => state.tenants);

  const getTenant = useCallback(async () => {
    try {
      dispatch(getTenantDetails(tenantId));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
    }
  }, [dispatch]);

  const handleSaveTenant = useCallback(
    async (payload = {}) => {
      try {
        if (isEdit) {
          dispatch(patchTenant(payload));
        } else {
          dispatch(saveTenant(payload, { createTenantUser: true }));
        }
        enqueueSnackbar(!isEdit ? translate('app.tenant-add-success') : translate('app.tenant-update-success'));
        navigate(PATH_DASHBOARD.tenants.list);
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (tenantId && isEdit) {
      getTenant();
    }
  }, [tenantId]);

  useEffect(() => {
    dispatch(resetTenantDetails());
  }, []);

  const onCancel = () => {
    navigate(PATH_DASHBOARD.tenants.list);
  };
  const tenantName = tenantDetails?.tenantName ? tenantDetails.tenantName : '';
  return (
    <Page title={`${translate('app.tenants-label')} : ${translate('app.tenants-new-tenant-label')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('app.tenants-add-header-label')}` : `${translate('app.tenants-edit-header-label')}`
          }
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.tenants-label')}`, href: PATH_DASHBOARD.general.tenants },
            { name: !isEdit ? `${translate('app.tenants-new-tenant-label')}` : tenantName },
          ]}
        />

        <TenantNewForm
          isEdit={isEdit}
          currentTenant={tenantDetails}
          translate={translate}
          handleSave={handleSaveTenant}
          onCancel={onCancel}
        />
      </Container>
    </Page>
  );
}
