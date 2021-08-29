import { WithStyles, WithTheme, withStyles, Menu, MenuItem } from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Logo } from "containers/Sidebar/SidebarMenu/Logo";
import * as sidebarActions from "containers/Sidebar/store/sidebar.action";
import { translationService } from "services/translation/translation.service";

import { styles } from "./styles";

interface IDispatchToProps {
  toggleSidebar: () => void;
}

interface IProps extends WithStyles<typeof styles>, WithTheme, IDispatchToProps, RouteComponentProps<{ id: string }> {}

interface IState {
  prevLocationPathname: string;
  userSettingsMenuAnchorElement: HTMLElement;
}

class TopbarMenuComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = { prevLocationPathname: "", userSettingsMenuAnchorElement: null };
  }

  public static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.location.pathname !== state.prevLocationPathname) {
      return {
        prevLocationPathname: props.location.pathname
      };
    }
    return null;
  }

  public handleUserSettingsMenuClose = () => {
    this.setState({ userSettingsMenuAnchorElement: null });
  };

  public handleEditUserSettings = () => {
    this.handleUserSettingsMenuClose();
  };

  public handleUserSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ userSettingsMenuAnchorElement: event.currentTarget });
  };

  public get userSettingsMenu(): JSX.Element {
    const { classes } = this.props;
    const { userSettingsMenuAnchorElement } = this.state;
    return (
      <Menu
        id="simple-menu"
        open={Boolean(userSettingsMenuAnchorElement)}
        onClose={this.handleUserSettingsMenuClose}
        anchorEl={userSettingsMenuAnchorElement}
        PaperProps={{ className: classes.menuListContainer }}
      >
        <MenuItem onClick={this.handleEditUserSettings}>
          {translationService.getMessageTranslation("settings-header-label", "Settings")}
        </MenuItem>
        <MenuItem onClick={this.handleLogoutClick}>
          {translationService.getMessageTranslation("log-out-label", "Logout")}
        </MenuItem>
      </Menu>
    );
  }

  public get userSettingButtons(): JSX.Element {
    const { classes } = this.props;
    const { userSettingsMenuAnchorElement } = this.state;

    return (
      <div className={classes.userSettingButtonsContainer}>
        <span className={classes.userName}>
          {translationService.getMessageTranslation("welcome-text", "Welcome, {0}", "User")}
        </span>
        <span className={classes.pipeSeparator}>|</span>
        <span
          onClick={this.handleUserSettingsMenuOpen}
          className={classNames(
            classes.userSettingButtons,
            Boolean(userSettingsMenuAnchorElement) && classes.userSettingButtonsHighlighted
          )}
        >
          <PersonOutlineOutlinedIcon className={classes.icon} />
        </span>
        {this.userSettingsMenu}
      </div>
    );
  }

  public handleLogoutClick = async () => {
    this.handleUserSettingsMenuClose();
  };

  public render() {
    const { classes, toggleSidebar: handleMenuButtonClick } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.menuButton} onClick={handleMenuButtonClick}>
          <Logo full={false} />
        </div>
        {this.userSettingButtons}
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleSidebar: sidebarActions.toggleSidebar
};

export const TopbarMenu = withRouter(
  withStyles(styles, { withTheme: true })(connect<{}, IDispatchToProps>(null, mapDispatchToProps)(TopbarMenuComponent))
);
