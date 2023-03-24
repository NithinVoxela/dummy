import React from 'react';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import EmergencyRecordingOutlinedIcon from '@mui/icons-material/EmergencyRecordingOutlined';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import AlertCountLabel from '../../../sections/alerts/AlertCountLabel';
import { ADMIN_ROLE, MULTIPLE_TENANT_ACCESS_ROLE } from '../../../sections/common/CommonConstants';
// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  organization: getIcon('ic_organization'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  alerts: <WarningAmberOutlinedIcon />,
  recordings: <EmergencyRecordingOutlinedIcon />,
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  analytics: getIcon('ic_analytics'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.dashboard, icon: ICONS.dashboard },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'alerts', path: PATH_DASHBOARD.general.alerts, icon: ICONS.alerts, info: <AlertCountLabel /> },
      { title: 'recordings', path: PATH_DASHBOARD.general.recordings, icon: ICONS.recordings, role: ['SUPER_ADMIN'] },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      { title: 'agents', path: PATH_DASHBOARD.general.agents, icon: ICONS.kanban, role: ['SUPER_ADMIN'] },
      { title: 'cameras', path: PATH_DASHBOARD.general.cameras, icon: ICONS.kanban },
      { title: 'users', path: PATH_DASHBOARD.general.users, icon: ICONS.user, role: ADMIN_ROLE },
      {
        title: 'tenants',
        path: PATH_DASHBOARD.general.tenants,
        icon: ICONS.organization,
        role: MULTIPLE_TENANT_ACCESS_ROLE,
      },
    ],
  },
];

export default navConfig;
