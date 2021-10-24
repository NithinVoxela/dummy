import { Button, Link, StyledComponentProps, Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { translationService } from "services/translation/translation.service";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { styles } from "./styles";

interface IProps extends StyledComponentProps {
  notification: any;
}

const BaseNotificationComponent: React.FunctionComponent<IProps> = ({ classes, notification }) => {
  let details = {};
  // try {
  //   details = JSON.parse(notification);
  // } catch {
  //   details = {};
  // }
  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Typography variant="button">{notification?.notification?.title}</Typography>
        <Typography variant="body2">{notification?.notification?.body}</Typography>
        <div>
          <Link
            color="primary"
            component={RouterLink}
            to={`/alerts/${details?.alertId}`}
            variant="subtitle2"
            underline="always"
            className={classes.action}
          >
            {translationService.getMessageTranslation("view-details-label", "View Details")}...
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export const Notification = withStyles(styles)(BaseNotificationComponent);
