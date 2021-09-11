import { Grid, Hidden, Menu, MenuItem, AppBar, IconButton, Toolbar, Avatar, Badge } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import userAvatar from "assets/avatar-1.jpg";
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

  return (
    <>
      <Badge variant="dot" onClick={handleToggleMenu} className={classes.badge}>
        <Avatar alt="Lucy Lavender" src={userAvatar} />
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
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const TopBar = TopBarComponent;
