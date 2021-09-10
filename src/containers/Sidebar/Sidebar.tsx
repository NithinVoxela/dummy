import { Drawer, Hidden, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useEffect } from "react";
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
  openMobile
}) => {
  const location = useLocation();
  useEffect(() => {
    if (openMobile && handleMobileClose) {
      handleMobileClose();
    }
  }, [location.pathname, openMobile, handleMobileClose]);

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={handleMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <SideBarMenu />
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
          onClick={handleMobileClose}
        >
          <SideBarMenu />
        </Drawer>
      </Hidden>
    </>
  );
};

export const Sidebar = withStyles(styles)(SideBarComponent);
