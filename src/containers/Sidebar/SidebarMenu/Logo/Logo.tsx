import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as React from "react";

import logoFull from "assets/icons/voxela-logo-full.jpg";
import logo from "assets/icons/voxela-logo.svg";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles> {
  full: boolean;
}

const LogoComponent: React.FunctionComponent<IProps> = ({ classes, full }) => {
  return (
    <div className={classes.root}>
      <div className={classNames(classes.logoContainer, !full && classes.logoContainerCollapsed)}>
        <img
          className={full ? classes.logoExpanded : classes.logoCollapsed}
          src={full ? logoFull : logo}
          alt="logo"
          data-component={full ? "logo-expanded" : "logo-collapsed"}
        />
      </div>
    </div>
  );
};

export const Logo = withStyles(styles)(LogoComponent);
