import { useCallback, useEffect, useMemo, useState } from 'react';
import { cloneDeep, debounce } from 'lodash';
// @mui
import { Card, Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Searchbar from '../../components/widgets/Searchbar';
import TableWidget from '../../components/table/TableWidget';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/users';
import { USERS_TABLE_META } from './UserConstants';

const UserList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const [params, setParams] = useState({
    name: '',
  });
  const { userList, isLoading } = useSelector((state) => state.users);

  const getUsersData = useCallback(
    async (queryParams = {}) => {
      try {
        const payload = { ...params, name: queryParams?.name || '' };
        delete queryParams.name;
        await dispatch(getUsers(queryParams, payload));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const searchHandler = (searchStr) => {
    const searchParams = {
      name: '',
    };
    if (searchStr.length > 0) {
      searchParams.name = searchStr;
    }
    setParams(searchParams);
    // getCameraData({}, searchParams);
  };

  const debounceSearchHandler = useCallback(debounce(searchHandler, 1000), []);

  const handleQueryChange = (value) => {
    debounceSearchHandler(value);
  };

  const tableMetaData = useMemo(() => {
    const metaData = cloneDeep(USERS_TABLE_META);
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
        />
        <Card>
          <Searchbar placeholder={translate('app.alert-search-txt-label')} onSearchTextChange={handleQueryChange} />
          <TableWidget
            tableMetaData={tableMetaData}
            tableData={userList}
            callback={getUsersData}
            isLoading={isLoading}
            params={params}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default UserList;
