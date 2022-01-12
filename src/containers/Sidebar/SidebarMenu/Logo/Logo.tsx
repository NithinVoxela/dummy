import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

import logo from "assets/icons/voxela-logo.svg";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles> {}

const LogoComponent: React.FunctionComponent<IProps> = ({ classes }) => (
  <img alt="Logo" src={logo} className={classes.logo} />
);

export const Logo = withStyles(styles)(LogoComponent);
