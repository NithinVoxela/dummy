import { Hidden, Paper, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useState } from "react";

import { LoadingBar } from "containers/Loading";
import { Sidebar } from "containers/Sidebar";
import { TopBar } from "containers/TopBar";

import { styles } from "./styles";

const BaseComponent: React.FC<WithStyles> = ({ classes, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className={classes.root}>
      <div className={classes.drawer}>
        <Hidden mdUp implementation="js">
          <Sidebar
            PaperProps={{ style: { width: 260 } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar PaperProps={{ style: { width: 260 } }} />
        </Hidden>
      </div>
      <div className={classes.appContent}>
        <TopBar onDrawerToggle={handleDrawerToggle} />
        <Paper>{children}</Paper>
      </div>
      <LoadingBar />
    </div>
  );
};

export const Base = withStyles(styles)(BaseComponent);
