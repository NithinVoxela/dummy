import { Box, Drawer, ListItem, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useEffect } from "react";
import { Layers } from "react-feather";
import { useLocation } from "react-router-dom";

import { SideBarMenu } from "./SidebarMenu";
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
        <Layers className={classes.brandIcon} />
        <Box ml={1}>VOXELA</Box>
      </ListItem>
      <SideBarMenu />
    </Drawer>
  );
};

export const Sidebar = withStyles(styles)(SideBarComponent);
