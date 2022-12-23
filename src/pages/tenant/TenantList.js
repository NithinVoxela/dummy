import { useCallback, useMemo, useState } from 'react';
import { cloneDeep, debounce } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Card, Container, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Searchbar from '../../components/widgets/Searchbar';
import TableWidget from '../../components/table/TableWidget';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getTenants } from '../../redux/slices/tenants';
// sections
import { TENANT_TABLE_META } from './TenantConstants';
import { ListMenu } from '../../sections/common';
import { ICON } from '../../sections/common/ListMenu';
import { RootStyle } from '../../sections/common/StyleConstants';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TenantList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const [params, setParams] = useState({});
  const { tenantDataList, isLoading } = useSelector((state) => state.tenants);

  const getTenantData = useCallback(
    async (queryParams = {}) => {
      try {
        const payload = { ...params };
        await dispatch(getTenants(queryParams, payload));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const searchHandler = (attributename, searchStr) => {
    if (attributename === 'tenantName') {
      params.tenantName = searchStr;
    }

    if (attributename === 'tenantCode') {
      params.tenantCode = searchStr;
    }

    setParams({ ...params });
  };

  const debounceSearchHandler = useCallback(debounce(searchHandler, 1000), []);

  const handleNameChange = (value) => {
    debounceSearchHandler('tenantName', value);
  };

  const handleCodeChange = (value) => {
    debounceSearchHandler('tenantCode', value);
  };

  const getMenuItems = (id) => {
    return (
      <>
        <MenuItem component={RouterLink} to={`${PATH_DASHBOARD.cameras.root}/apps/${id}`}>
          <Iconify icon={'mdi:apps'} sx={{ ...ICON }} />
          {translate('app.tenant-impersonate-label')}
        </MenuItem>
      </>
    );
  };

  const tableMetaData = useMemo(() => {
    const metaData = cloneDeep(TENANT_TABLE_META);
    metaData.columns[metaData.columns.length - 1] = {
      text: '',
      dataKey: 'id',
      type: 'widget',
      renderWidget: (col, cellData, value) => <ListMenu getMenuItems={() => getMenuItems(value)} />,
    };
    return metaData;
  }, []);

  return (
    <Page title={translate('app.tenants-list-header-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.tenants-list-header-label')}
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.tenants-label')}` },
          ]}
        />
        <Card>
          <RootStyle>
            <Searchbar placeholder={translate('app.name-search-txt-label')} onSearchTextChange={handleNameChange} />
            <Searchbar placeholder={translate('app.code-search-txt-label')} onSearchTextChange={handleCodeChange} />
          </RootStyle>

          <TableWidget
            tableMetaData={tableMetaData}
            tableData={tenantDataList}
            callback={getTenantData}
            isLoading={isLoading}
            params={params}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default TenantList;
