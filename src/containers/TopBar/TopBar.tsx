import { Grid, Hidden, Menu, MenuItem, AppBar, IconButton, Toolbar, Avatar, Badge } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

import { Notification } from "components/Toastify";
import { IUserAccount } from "models/user.model";
import { translationService } from "services/translation/translation.service";
import { AppStore } from "store/configureStore";
import { IApplicationState } from "store/state.model";
import { removeUserAccount, userAlertCount } from "store/userAccount/userAccount.actions";
import { getUserAccount } from "store/userAccount/userAccount.selector";

import { useStyles } from "./styles";

export const REFRESH_INTERVAL = 30 * 1000;
interface IDispatchToProps {}

interface IStateToProps {
  user: IUserAccount;
}

interface IProps extends IStateToProps, IDispatchToProps {
  onDrawerToggle: () => void;
}

const UserMenu: React.FC = () => {
  const classes = useStyles({});
  const [anchorMenu, setAnchorMenu] = useState(null);
  const dispatch = useDispatch();

  const handleToggleMenu = (event: any) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const handleLogout = () => {
    dispatch(removeUserAccount());
    setAnchorMenu(null);
  };

  const getUserName = () => {
    const appStore = AppStore.getInstance();
    if (!appStore) {
      return null;
    }

    const state = appStore.getState();
    return state.userAccount.userName?.charAt(0)?.toUpperCase();
  };

  return (
    <>
      <Badge variant="dot" onClick={handleToggleMenu} className={classes.badge}>
        <Avatar alt="User" className={classes.small}>
          {getUserName()}
        </Avatar>
      </Badge>
      <Menu id="menu-appbar" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          {translationService.getMessageTranslation("camera-profile-label", "Profile")}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {translationService.getMessageTranslation("camera-logout-label", "Logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

const notify = (notification: any) => toast(<Notification notification={notification} />);

const TopBarComponent: React.FC<IProps> = ({ onDrawerToggle: handleDrawerToggle, user }) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [alertCount, setAlertCount] = useState(null);

  const notification = {
    title: translationService.getMessageTranslation(`alerts-new-activity-label`, "New activity detected"),
    body: translationService.getMessageTranslation(
      `alerts-new-activity-desc-label`,
      "New activity detected on camera."
    ),
    actionLabel: translationService.getMessageTranslation(`alerts-view-alert-label`, "View Alerts"),
    actionUrl: "/alerts"
  };

  const refreshAlertCount = () => {
    dispatch(userAlertCount({ pageNumber: 0, pageSize: 1, dateRange: { startDate: null, endDate: null } }));
  };
  useEffect(() => {
    refreshAlertCount();
    const refreshPage = setInterval(() => {
      refreshAlertCount();
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(refreshPage);
    };
  }, [userAlertCount]);

  useEffect(() => {
    const count = user?.alertLog?.totalCount || 0;
    if (alertCount && count > alertCount) {
      const payload = {
        isCustom: true,
        notification
      };
      notify(payload);
    }
    setAlertCount(user?.alertLog?.totalCount);
  }, [user]);

  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton color="inherit" aria-label="Open drawer" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item xs />
          {/* <Grid item>
            <Badge color="error" badgeContent={7} className={classes.alertCount}>
              <NotificationsIcon />
            </Badge>
          </Grid> */}
          <Grid item>
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (state: IApplicationState) => ({
  user: getUserAccount(state)
});

export const TopBar = connect<IStateToProps, IDispatchToProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopBarComponent));
