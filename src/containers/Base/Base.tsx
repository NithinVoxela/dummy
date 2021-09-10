import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useState } from "react";

import { LoadingBar } from "containers/Loading";
import { Sidebar } from "containers/Sidebar";
import { TopBar } from "containers/TopBar";

import { styles } from "./styles";

const BaseComponent: React.FC<WithStyles> = ({ classes, children }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const handleMobileNavOpen = () => {
    setMobileNavOpen(true);
  };
  const handleMobileNavClose = () => {
    setMobileNavOpen(false);
  };
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={handleMobileNavOpen} />
      <Sidebar onMobileClose={handleMobileNavClose} openMobile={isMobileNavOpen} />
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
      <LoadingBar />
    </div>
  );
};

export const Base = withStyles(styles)(BaseComponent);
