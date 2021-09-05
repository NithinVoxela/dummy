import { ListItem, Box, WithStyles, withStyles, Button } from "@material-ui/core";
import { ListItemProps } from "@material-ui/core/ListItem";
import classNames from "classnames";
import * as React from "react";
import { BarChart as DashboardIcon, AlertCircle as AlertCircleIcon } from "react-feather";
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
        <ListItem className={classes.item} disableGutters ref={ref}>
          <Button
            className={classNames(classes.button, { [classes.active]: isSelectedLink(props.to) })}
            component={RouterLink}
            to={props.to}
          >
            {Icon && <Icon className={classes.icon} size="20" />}
            <span className={classes.title}>{props.label}</span>
          </Button>
        </ListItem>
      );
    }
  );
  LinkedListItem.displayName = "LinkedListItem";

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2}>
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
      </Box>
    </Box>
  );
};

export const SideBarMenu = withRouter(withStyles(styles)(SidebarMenuComponent));
