import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

import { LoadingBar } from "containers/Loading";
import { Notifier } from "containers/Notifier";
import { Sidebar } from "containers/Sidebar";
import { TopBar } from "containers/TopBar";

import { styles } from "./styles";

const BaseComponent: React.FC<WithStyles> = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <TopBar />
        <div className={classes.mainContent}>{children}</div>
      </main>
      <Notifier />
      <LoadingBar />
    </div>
  );
};

export const Base = withStyles(styles)(BaseComponent);
