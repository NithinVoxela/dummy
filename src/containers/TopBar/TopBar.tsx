import { AppBar, Toolbar, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

import { styles } from "./styles";
import { TopbarMenu } from "./TopbarMenu";

interface IProps extends WithStyles<typeof styles> {}

const TopBarComponent: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <AppBar position="static" className={classes.appTopBarSmall}>
      <Toolbar className={classes.appTopToolBarSmall}>
        <TopbarMenu />
      </Toolbar>
    </AppBar>
  );
};

export const TopBar = withStyles(styles)(TopBarComponent);
