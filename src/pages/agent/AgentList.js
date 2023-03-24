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
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Searchbar from '../../components/widgets/Searchbar';
import TableWidget from '../../components/table/TableWidget';
import DeleteModal from '../../components/widgets/DeleteModal';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAgents, deleteAgent } from '../../redux/slices/agents';
// sections
import { AGENT_TABLE_META } from './AgentConstant';
import { ListMenu } from '../../sections/common';
import { ICON } from '../../sections/common/ListMenu';
import { RootStyle } from '../../sections/common/StyleConstants';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const AgentList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const [params, setParams] = useState({});
  const [refreshTable, setRefreshTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const { agentDataList, isLoading } = useSelector((state) => state.agents);

  const getAgentData = useCallback(
    async (queryParams = {}) => {
      const payload = { ...params };
      dispatch(getAgents(queryParams, payload));
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
    async (agentId) => {
      try {
        await deleteAgent(agentId);
        enqueueSnackbar(translate('app.camera-delete-success'));
        setShowModal(false);
        setRefreshTable(true);
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

  const getMenuItems = (id) => {
    return (
      <>
        <MenuItem component={RouterLink} to={`${PATH_DASHBOARD.agents.root}/edit/${id}`}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {translate('app.camera-edit-label')}
        </MenuItem>
        <MenuItem onClick={() => showWarningModal(id)} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {translate('app.camera-delete-label')}
        </MenuItem>
      </>
    );
  };

  const tableMetaData = useMemo(() => {
    const metaData = cloneDeep(AGENT_TABLE_META);
    metaData.columns[metaData.columns.length - 1] = {
      text: '',
      dataKey: 'id',
      type: 'widget',
      renderWidget: (col, cellData, value) => <ListMenu getMenuItems={() => getMenuItems(value)} />,
    };
    return metaData;
  }, []);

  return (
    <Page title={translate('app.agents-list-header-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.agents-list-header-label')}
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.agents-label')}` },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.agents.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {translate('app.agents-new-agent-label')}
            </Button>
          }
        />
        <Card>
          <RootStyle>
            <Searchbar placeholder={translate('app.name-search-txt-label')} onSearchTextChange={handleNameChange} />
          </RootStyle>

          <TableWidget
            tableName="agent"
            tableMetaData={tableMetaData}
            tableData={agentDataList}
            callback={getAgentData}
            isLoading={isLoading}
            params={params}
            refreshTable={refreshTable}
          />
        </Card>
      </Container>
      <DeleteModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        type="Agent"
        recordId={recordId}
        handleDelete={handleDelete}
      />
    </Page>
  );
};

export default AgentList;
