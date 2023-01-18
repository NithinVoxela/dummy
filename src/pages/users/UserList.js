import { useCallback, useMemo, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Card, Button, Container, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import TableWidget from '../../components/table/TableWidget';
import DeleteModal from '../../components/widgets/DeleteModal';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { deleteUser, getUsers } from '../../redux/slices/users';
// sections
import { USERS_TABLE_META } from './UserConstants';
import ListMenu, { ICON } from '../../sections/common/ListMenu';

const UserList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const [params, setParams] = useState({
    userName: '',
  });
  const [refreshTable, setRefreshTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const { userList, isLoading } = useSelector((state) => state.users);

  const getUsersData = useCallback(
    async (queryParams = {}) => {
      try {
        const payload = { ...params, userName: queryParams?.userName || '' };
        delete queryParams.userName;
        dispatch(getUsers(queryParams, payload));
        setRefreshTable(false);
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const showWarningModal = (id) => {
    setRecordId(id);
    setShowModal(true);
  };

  const handleDelete = useCallback(
    async (userId) => {
      try {
        dispatch(deleteUser(userId));
        setRefreshTable(true);
        enqueueSnackbar(translate('app.users-delete-success'));
        setShowModal(false);
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
        console.error(err);
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

        <MenuItem component={RouterLink} to={`${PATH_DASHBOARD.users.root}/edit/${id}`}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {translate('app.camera-edit-label')}
        </MenuItem>
      </>
    );
  };

  const tableMetaData = useMemo(() => {
    const metaData = cloneDeep(USERS_TABLE_META);
    metaData.columns[metaData.columns.length - 1] = {
      text: '',
      dataKey: 'id',
      type: 'widget',
      renderWidget: (col, cellData, value) => <ListMenu getMenuItems={() => getMenuItems(value)} />,
    };
    return metaData;
  }, []);

  return (
    <Page title={translate('app.users-list-header-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.users-list-header-label')}
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.alert-users-label')}` },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.users.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {translate('app.users-new-users-label')}
            </Button>
          }
        />
        <Card>
          <TableWidget
            tableName="user"
            tableMetaData={tableMetaData}
            tableData={userList}
            callback={getUsersData}
            isLoading={isLoading}
            params={params}
            refreshTable={refreshTable}
          />
        </Card>
      </Container>
      <DeleteModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        type="User"
        recordId={recordId}
        handleDelete={handleDelete}
      />
    </Page>
  );
};

export default UserList;
