import React from 'react';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import EmergencyRecordingOutlinedIcon from '@mui/icons-material/EmergencyRecordingOutlined';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import AlertCountLabel from '../../../sections/alerts/AlertCountLabel';
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
  impersonation: <Iconify icon={'ic:outline-screen-share'} />,
  stopImpersonation: <Iconify icon={'ic:outline-stop-screen-share'} />,
};

export const ADMIN_ROLE = ['ADMIN', 'ORG_ADMIN', 'SUPER_ADMIN'];
export const MULTIPLE_TENANT_ACCESS_ROLE = ['ORG_ADMIN', 'SUPER_ADMIN'];

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.dashboard, icon: ICONS.dashboard },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'alerts', path: PATH_DASHBOARD.general.alerts, icon: ICONS.alerts, info: <AlertCountLabel /> },
      { title: 'recordings', path: PATH_DASHBOARD.general.recordings, icon: ICONS.recordings },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
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
