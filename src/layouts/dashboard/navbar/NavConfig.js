import React, { useContext } from 'react';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import EmergencyRecordingOutlinedIcon from '@mui/icons-material/EmergencyRecordingOutlined';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import AlertCountLabel from '../../../sections/alerts/AlertCountLabel';
import AuthUser from '../../../pages/users/AuthUser';
import { AuthContext } from '../../../contexts/JWTContext';
// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  alerts: <WarningAmberOutlinedIcon />,
  recordings: <EmergencyRecordingOutlinedIcon />,
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  analytics: getIcon('ic_analytics'),
};

// const UserAuth = () => {
//   const authContext = useContext(AuthContext);
//   console.log(authContext);
//   console.log(authContext?.user);
//   console.log(authContext?.user?.role);
//   console.log(typeof authContext?.user?.role);
//   console.log(authContext?.user?.role === 'adfad');

//   if (authContext?.user?.role === 'adfad') {
//     return true;
//   }
//   return false;
// };

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
    role: ['ADMIN'],
    items: [
      { title: 'cameras', path: PATH_DASHBOARD.general.cameras, icon: ICONS.kanban },
      // AuthContext?.user?.role === 'USER'
      { title: 'users', path: PATH_DASHBOARD.general.users, icon: ICONS.user },
    ],
  },
];

export default navConfig;
