import { Hidden, Paper, WithStyles, withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { isWidthUp, WithWidthProps } from "@material-ui/core/withWidth";
import * as React from "react";
import { useState } from "react";

import { LoadingBar } from "containers/Loading";
import { Sidebar } from "containers/Sidebar";
import { TopBar } from "containers/TopBar";

import { styles } from "./styles";

interface IProps extends WithStyles, WithWidthProps {}

const BaseComponent: React.FC<IProps> = ({ classes, children, width }) => {
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
        <Paper style={{ padding: isWidthUp("lg", width) ? 40 : 20 }}>{children}</Paper>
      </div>
      <LoadingBar />
    </div>
  );
};

export const Base = withWidth()(withStyles(styles)(BaseComponent));
