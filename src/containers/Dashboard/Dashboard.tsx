import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles> {}

class DashboardComponent extends React.Component<IProps> {
  public render() {
    return null;
  }
}

export const Dashboard = withStyles(styles)(DashboardComponent);