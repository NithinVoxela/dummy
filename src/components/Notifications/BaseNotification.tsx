import { IconButton, SnackbarContent, StyledComponentProps, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import classNames from "classnames";
import * as React from "react";

import { INotification } from "models/notification.model";

import { styles } from "./styles";

interface IProps extends StyledComponentProps {
  variant: string;
  notification: INotification;
  onClose: () => void;
}

const BaseNotificationComponent: React.FunctionComponent<IProps> = ({
  classes,
  variant = "success",
  notification,
  onClose: handleClose
}) => {
  return (
    <SnackbarContent
      onClick={handleClose}
      className={classNames(classes.root, classes[variant])}
      classes={{
        action: classes.action
      }}
      message={
        <span className={classes.message}>
          <Typography variant="h5" className={classes.header}>
            {notification.header}
          </Typography>
          <Typography className={classes.message}>{notification.message}</Typography>
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      ]}
    />
  );
};

export const BaseNotification = withStyles(styles)(BaseNotificationComponent);
