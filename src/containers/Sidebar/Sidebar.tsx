import { Box, Drawer, ListItem, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useLocation } from "react-router-dom";

import { SideBarMenu } from "./SidebarMenu";
import { Logo } from "./SidebarMenu/Logo";
import { styles } from "./styles";

interface IProps extends WithStyles {
  onMobileClose: () => void;
  openMobile: boolean;
}

const SideBarComponent: React.FunctionComponent<IProps> = ({
  classes,
  onMobileClose: handleMobileClose,
  openMobile,
  ...rest
}) => {
  const location = useLocation();
  useEffect(() => {
    if (openMobile && handleMobileClose) {
      handleMobileClose();
    }
  }, [location.pathname, openMobile, handleMobileClose]);

  return (
    <Drawer variant="permanent" className={classes.drawer} {...rest}>
      <ListItem className={classes.brand}>
        <Box className={classes.brandIcon}>
          <Logo />
        </Box>
        <Box ml={1}>VCare</Box>
      </ListItem>
      <PerfectScrollbar className={classes.scrollContainer}>
        <SideBarMenu />
      </PerfectScrollbar>
    </Drawer>
  );
};

export const Sidebar = withStyles(styles)(SideBarComponent);
