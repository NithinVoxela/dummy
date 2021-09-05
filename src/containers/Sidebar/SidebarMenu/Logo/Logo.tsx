import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

import logo from "assets/icons/logo.svg";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles> {}

const LogoComponent: React.FunctionComponent<IProps> = () => <img alt="Logo" src={logo} />;

export const Logo = withStyles(styles)(LogoComponent);
