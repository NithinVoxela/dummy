import { List, ListItem, ListItemIcon, ListItemText, WithStyles, withStyles } from "@material-ui/core";
import { ListItemProps } from "@material-ui/core/ListItem";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { RouterLink } from "components/RouterLink";
import { routes } from "configs/routes/routes.config";
import { translationService } from "services/translation/translation.service";

import { styles } from "./styles";

interface ILinkListItemProps extends ListItemProps {
  to?: string;
  component?: any;
  label: string;
  Icon: React.FC<any>;
}

interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
  onNavigationClick?: () => void;
}

const SidebarMenuComponent: React.FunctionComponent<IProps> = ({ classes, location, onNavigationClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigationClick) {
      onNavigationClick();
    }
  };

  const isSelectedLink = (path: string): boolean => {
    return path === location.pathname;
  };

  const LinkedListItem: React.ReactType<ILinkListItemProps> = React.forwardRef(
    ({ component, Icon, ...props }, ref: any) => {
      return (
        <ListItem
          // @ts-ignore
          button
          classes={{ selected: classes.selected }}
          component={RouterLink}
          ref={ref}
          selected={isSelectedLink(props.to)}
          className={classes.item}
          disableGutters
          {...props}
        >
          <ListItemIcon>
            <Icon className={classes.icon} />
          </ListItemIcon>
          <ListItemText secondary={props.label} className={classes.sideMenuText} />
        </ListItem>
      );
    }
  );
  LinkedListItem.displayName = "LinkedListItem";

  return (
    <div className={classes.root} data-component="side-bar-menu">
      <List disablePadding component="nav" onClick={handleClick}>
        <LinkedListItem
          to={routes.dashboard.to}
          label={translationService.getMessageTranslation("dashboard-header-label", "Dashboard")}
          Icon={DashboardOutlinedIcon}
        />
        <LinkedListItem
          to={routes.alerts.to}
          label={translationService.getMessageTranslation("alerts-header-label", "Alerts")}
          Icon={ReportProblemOutlinedIcon}
        />
      </List>
    </div>
  );
};

export const SideBarMenu = withRouter(withStyles(styles)(SidebarMenuComponent));
