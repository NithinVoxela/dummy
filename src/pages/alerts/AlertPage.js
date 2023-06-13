import { useState, useRef } from 'react';

// @mui
import { Button, Container, Tab, Box, Tabs } from '@mui/material';
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';

// sections
import AlertList from './AlertList';

const AlertPage = () => {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const childRef = useRef();
  const [currentTab, setCurrentTab] = useState('all');

  const handleMarkAsRead = () => {
    if (childRef.current) {
      childRef.current.handleMarkAsRead();
    }
  };
  const handleRefresh = () => {
    if (childRef.current) {
      childRef.current.handleRefresh();
    }
  };

  const handleTabChange = async (e, value) => {
    setCurrentTab(value);
  };

  const APP_TABS = [
    {
      value: 'all',
      label: translate('app.all-option-label'),
      icon: <Iconify icon={'codicon:settings'} width={20} height={20} />,
      component: <AlertList ref={childRef} currentTab={currentTab} alertSessionFilter="alert-filter-all" />,
    },
    {
      value: 'archive',
      label: translate('app.archive-label'),
      icon: <BookmarksTwoToneIcon width={20} height={20} />,
      component: <AlertList ref={childRef} currentTab={currentTab} alertSessionFilter="alert-filter-archive" />,
    },
  ];

  return (
    <Page title={translate('app.alerts-list-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.alerts-list-label')}
          links={[
            { name: translate('app.dashboard-header-label'), href: PATH_DASHBOARD.root },
            { name: translate('app.alerts-header-label') },
          ]}
          action={
            <>
              {currentTab === 'all' && (
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon={'mdi:check-all'} />}
                  onClick={handleMarkAsRead}
                  sx={{ mr: 1 }}
                >
                  {translate('app.mark-all-read-label')}
                </Button>
              )}
              <Button variant="contained" startIcon={<Iconify icon={'ic:outline-refresh'} />} onClick={handleRefresh}>
                {translate('app.alert-refresh-label')}
              </Button>
            </>
          }
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleTabChange}
        >
          {APP_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 1 }} />

        {APP_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
};

export default AlertPage;
