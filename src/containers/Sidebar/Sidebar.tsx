import { Drawer, Hidden, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { IApplicationState } from "store/state.model";

import { SideBarMenu } from "./SidebarMenu";
import { Logo } from "./SidebarMenu/Logo";
import * as actions from "./store/sidebar.action";
import { getSidebarStatus } from "./store/sidebar.selector";
import { styles } from "./styles";

interface IStateToProps {
  open: boolean;
}
interface IDispatchToProps {
  toggleSidebar: () => void;
}
interface IProps extends IStateToProps, IDispatchToProps, RouteComponentProps, WithStyles { }

class SideBarComponent extends React.PureComponent<IProps> {
  public handleOpenSideBar = () => {
    const { toggleSidebar } = this.props;
    toggleSidebar();
  };

  public render() {
    const { classes, open } = this.props;

    return (
      <>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={open}
            onClick={this.handleOpenSideBar}
            classes={{
              paper: classNames(classes.root, classes.draperPaperSmall)
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <Logo full />
            <SideBarMenu onNavigationClick={this.handleOpenSideBar} />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, classes.root, !open && classes.drawerPaperClose)
            }}
            open={open}
            onClick={this.handleOpenSideBar}
          >
            <Logo full={open} />
            <SideBarMenu />
          </Drawer>
        </Hidden>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  open: getSidebarStatus(state)
});

const mapDispatchToProps = {
  toggleSidebar: actions.toggleSidebar
};

export const Sidebar = withRouter(
  withStyles(styles)(connect<IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps)(SideBarComponent))
);
