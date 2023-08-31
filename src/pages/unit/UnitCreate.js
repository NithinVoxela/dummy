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
import { getUnitDetails, resetUnitDetails, saveUnit, patchUnit } from '../../redux/slices/units';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UnitNewForm from '../../sections/units/UnitNewForm';

// ----------------------------------------------------------------------

export default function UnitCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { unitId = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = pathname.includes('edit');

  const { unitDetails, error } = useSelector((state) => state.units);

  const getUnit = useCallback(async () => {
    dispatch(getUnitDetails(unitId, { requireDetails: true }));
  }, [dispatch]);

  const handleSaveUnit = useCallback(
    async (payload = {}) => {
      try {
        if (isEdit) {
          await patchUnit(payload);
        } else {
          await saveUnit(payload);
        }
        enqueueSnackbar(!isEdit ? translate('app.unit-add-success') : translate('app.unit-update-success'));
        navigate(PATH_DASHBOARD.units.list);
      } catch (error) {
        if (error?.message) {
          enqueueSnackbar(error.message, {
            variant: 'error',
          });
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (unitId && isEdit) {
      getUnit();
    }
  }, [unitId]);

  useEffect(
    () => () => {
      dispatch(resetUnitDetails());
    },
    []
  );

  const onCancel = () => {
    navigate(PATH_DASHBOARD.units.list);
  };
  const unitName = unitDetails?.name ? unitDetails.name : '';
  return (
    <Page title={`${translate('app.units-label')} : ${translate('app.units-new-unit-label')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('app.units-add-header-label')}` : `${translate('app.units-edit-header-label')}`
          }
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.units-label')}`, href: PATH_DASHBOARD.general.units },
            { name: !isEdit ? `${translate('app.units-new-unit-label')}` : unitName },
          ]}
        />

        <UnitNewForm
          isEdit={isEdit}
          currentUnit={unitDetails}
          translate={translate}
          handleSave={handleSaveUnit}
          onCancel={onCancel}
        />
      </Container>
    </Page>
  );
}
