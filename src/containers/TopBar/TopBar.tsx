import { AppBar, Box, Hidden, IconButton, Toolbar, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Logo } from "containers/Sidebar/SidebarMenu/Logo";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles> {
  onMobileNavOpen: () => void;
}

const TopBarComponent: React.FunctionComponent<IProps> = ({ onMobileNavOpen: handleMobileNavOpen }) => {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={handleMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export const TopBar = withStyles(styles)(TopBarComponent);
