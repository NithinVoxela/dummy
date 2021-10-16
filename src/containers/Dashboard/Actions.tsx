import * as React from "react";

import { Button, Menu, MenuItem } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon
} from "@material-ui/icons";

import { styles } from "./styles";

interface IState {
  anchorEl: any
}

interface IProps extends WithStyles<typeof styles> {}

class ActionsComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Button size="small" className={classes.smallButton}>
          <LoopIcon />
        </Button>
        <Button size="small" className={classes.smallButton}>
          <FilterListIcon />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.button}
        >
          Today: October 14
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Today</MenuItem>
          <MenuItem onClick={this.handleClose}>Yesterday</MenuItem>
          <MenuItem onClick={this.handleClose}>Last 7 days</MenuItem>
          <MenuItem onClick={this.handleClose}>Last 30 days</MenuItem>
          <MenuItem onClick={this.handleClose}>This month</MenuItem>
          <MenuItem onClick={this.handleClose}>Last month</MenuItem>
        </Menu>
      </>
    );
  }
}

export const Actions = withStyles(styles)(ActionsComponent);
