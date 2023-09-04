import { useCallback, useMemo, useState } from 'react';
import { cloneDeep, debounce } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Button, Card, Container, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Searchbar from '../../components/widgets/Searchbar';
import TableWidget from '../../components/table/TableWidget';
import DeleteModal from '../../components/widgets/DeleteModal';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUnits, deleteUnit } from '../../redux/slices/units';
// sections
import { UNIT_TABLE_META } from './UnitConstants';
import { ListMenu } from '../../sections/common';
import { ICON } from '../../sections/common/ListMenu';
import { RootStyle } from '../../sections/common/StyleConstants';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const UnitList = () => {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const [params, setParams] = useState({});
  const [refreshTable, setRefreshTable] = useState(false);
  const { unitDataList, isLoading } = useSelector((state) => state.units);
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const { user } = useAuth();

  const getUnitData = useCallback(
    async (queryParams = {}) => {
      const payload = { ...params };
      dispatch(getUnits(queryParams, payload));
      setRefreshTable(false);
    },
    [dispatch]
  );

  const searchHandler = (attributename, searchStr) => {
    if (attributename === 'name') {
      params.name = searchStr;
    }

    setParams({ ...params });
  };

  const debounceSearchHandler = useCallback(debounce(searchHandler, 1000), []);

  const handleNameChange = (value) => {
    debounceSearchHandler('name', value);
  };

  const showWarningModal = (id) => {
    setRecordId(id);
    setShowModal(true);
  };

  const handleDelete = useCallback(
    async (unitId) => {
      try {
        dispatch(deleteUnit(unitId));
        setRefreshTable(true);
        enqueueSnackbar(translate('app.unit-delete-success'));
        setShowModal(false);
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
      }
    },
    [dispatch]
  );

  const getMenuItems = (id) => {
    return (
      <>
        <MenuItem onClick={() => showWarningModal(id)} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {translate('app.camera-delete-label')}
        </MenuItem>

        <MenuItem component={RouterLink} to={`${PATH_DASHBOARD.units.root}/edit/${id}`}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {translate('app.camera-edit-label')}
        </MenuItem>
      </>
    );
  };

  const tableMetaData = useMemo(() => {
    const metaData = cloneDeep(UNIT_TABLE_META);
    metaData.columns[metaData.columns.length - 1] = {
      text: '',
      dataKey: 'id',
      type: 'widget',
      renderWidget: (col, cellData, value) => <ListMenu getMenuItems={() => getMenuItems(value)} />,
    };
    return metaData;
  }, []);

  return (
    <Page title={translate('app.units-list-header-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.units-list-header-label')}
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.units-label')}` },
          ]}
          action={
            <>
              {user?.role === 'SUPER_ADMIN' && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.units.new}
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                  {translate('app.units-new-unit-label')}
                </Button>
              )}
            </>
          }
        />
        <Card>
          <RootStyle>
            <Searchbar placeholder={translate('app.name-search-txt-label')} onSearchTextChange={handleNameChange} />
          </RootStyle>

          <TableWidget
            tableName="unit"
            tableMetaData={tableMetaData}
            tableData={unitDataList}
            callback={getUnitData}
            isLoading={isLoading}
            params={params}
            refreshTable={refreshTable}
          />
        </Card>
      </Container>
      <DeleteModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        type="Unit"
        recordId={recordId}
        handleDelete={handleDelete}
      />
    </Page>
  );
};

export default UnitList;
