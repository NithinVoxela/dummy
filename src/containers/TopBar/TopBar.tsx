import { Grid, Hidden, Menu, MenuItem, AppBar, IconButton, Toolbar, Avatar, Badge } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppStore } from "store/configureStore";
import { removeUserAccount } from "store/userAccount/userAccount.actions";

import { useStyles } from "./styles";

interface IProps {
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
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const TopBarComponent: React.FunctionComponent<IProps> = ({ onDrawerToggle: handleDrawerToggle }) => {
  const classes = useStyles({});

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
          <Grid item>
            <Badge color="error" badgeContent={7} className={classes.alertCount}>
              <NotificationsIcon />
            </Badge>
          </Grid>
          <Grid item>
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const TopBar = TopBarComponent;
