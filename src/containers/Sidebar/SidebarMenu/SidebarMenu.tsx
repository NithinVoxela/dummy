import { ListItem, WithStyles, withStyles, List, ListItemText } from "@material-ui/core";
import { ListItemProps } from "@material-ui/core/ListItem";
import classNames from "classnames";
import * as React from "react";
import { BarChart as DashboardIcon, AlertCircle as AlertCircleIcon, Video as VideoIcon } from "react-feather";
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

interface IProps extends WithStyles<typeof styles>, RouteComponentProps {}

const SidebarMenuComponent: React.FunctionComponent<IProps> = ({ classes, location }) => {
  const isSelectedLink = (path: string): boolean => {
    return path === location.pathname;
  };

  const LinkedListItem: React.ReactType<ILinkListItemProps> = React.forwardRef(
    ({ component, Icon, ...props }, ref: any) => {
      return (
        <ListItem
          ref={ref}
          component={RouterLink}
          to={props.to}
          className={classNames(classes.item, isSelectedLink(props.to) && "active")}
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <ListItemText className={classes.itemText}>{props.label}</ListItemText>
        </ListItem>
      );
    }
  );
  LinkedListItem.displayName = "LinkedListItem";

  return (
    <List className={classes.container} disablePadding>
      <div className={classes.items}>
        <LinkedListItem
          to={routes.dashboard.to}
          label={translationService.getMessageTranslation("dashboard-header-label", "Dashboard")}
          Icon={DashboardIcon}
        />
        <LinkedListItem
          to={routes.alerts.to}
          label={translationService.getMessageTranslation("alerts-header-label", "Alerts")}
          Icon={AlertCircleIcon}
        />
        <LinkedListItem
          to={routes.cameras.to}
          label={translationService.getMessageTranslation("cameras-header-label", "Cameras")}
          Icon={VideoIcon}
        />
      </div>
    </List>
  );
};

export const SideBarMenu = withRouter(withStyles(styles)(SidebarMenuComponent));
