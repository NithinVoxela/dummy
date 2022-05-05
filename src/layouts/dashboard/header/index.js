import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
import useLocales from '../../../hooks/useLocales';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { Notification } from "../../../components/toastify";
//
import AccountPopover from './AccountPopover';
import { useDispatch, useSelector } from '../../../redux/store';
import { getAlerts } from '../../../redux/slices/alerts';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export const REFRESH_INTERVAL = 30 * 1000;
const notify = (notification) => toast(<Notification notification={notification} />);

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertCount, setAlertCount] = useState(null);
  const { alertDataList } = useSelector((state) => state.alerts);

  const notification = {
    title: translate(`app.alerts-new-activity-label`),
    body: translate(`app.alerts-new-activity-desc-label`),
    actionLabel: translate(`app.alerts-view-alert-label`),
    actionUrl: PATH_DASHBOARD.general.alerts
  };

  const refreshAlertCount = useCallback(async(payload = {}) => {
    try {      
      const queryParams = {
        pageNumber: 0,
        pageSize: 1,
        sortAscending: false
      };
      await dispatch(getAlerts(queryParams, payload));      
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    refreshAlertCount();
    const refreshPage = setInterval(() => {
      refreshAlertCount();
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(refreshPage);
    };
  }, []);

  useEffect(() => {
    const count = alertDataList?.total || 0;
    if (alertCount && count > alertCount) {
      const payload = {
        isCustom: true,
        notification
      };
      notify(payload);
    }
    setAlertCount(alertDataList?.total);
  }, [alertDataList]);

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

      
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>      
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
