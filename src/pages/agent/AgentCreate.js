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
import { getAgentDetails, resetAgentDetails, saveAgent, patchAgent } from '../../redux/slices/agents';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import AgentNewForm from '../../sections/agents/AgentNewForm';

// ----------------------------------------------------------------------

export default function AgentCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { agentId = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = pathname.includes('edit');

  const { agentDetails, error } = useSelector((state) => state.agents);

  const getAgent = useCallback(async () => {
    dispatch(getAgentDetails(agentId, { requireMacIds: true, requireCameras: true }));
  }, [dispatch]);

  const handleSaveAgent = useCallback(
    async (payload = {}) => {
      try {
        if (isEdit) {
          await patchAgent(payload);
        } else {
          await saveAgent(payload);
        }
        enqueueSnackbar(!isEdit ? translate('app.agent-add-success') : translate('app.agent-update-success'));
        navigate(PATH_DASHBOARD.agents.list);
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
    if (agentId && isEdit) {
      getAgent();
    }
  }, [agentId]);

  useEffect(() => {
    dispatch(resetAgentDetails());
  }, []);

  const onCancel = () => {
    navigate(PATH_DASHBOARD.agents.list);
  };
  const agentName = agentDetails?.name ? agentDetails.name : '';
  return (
    <Page title={`${translate('app.agents-label')} : ${translate('app.agents-new-agent-label')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('app.agents-add-header-label')}` : `${translate('app.agents-edit-header-label')}`
          }
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.agents-label')}`, href: PATH_DASHBOARD.general.agents },
            { name: !isEdit ? `${translate('app.agents-new-agent-label')}` : agentName },
          ]}
        />

        <AgentNewForm
          isEdit={isEdit}
          currentAgent={agentDetails}
          translate={translate}
          handleSave={handleSaveAgent}
          onCancel={onCancel}
        />
      </Container>
    </Page>
  );
}
