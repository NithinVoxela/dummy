import { Snackbar, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { connect } from "react-redux";

import { BaseNotification } from "components/Notifications/BaseNotification";
import { NUMBERS } from "configs/constants";
import { INotification } from "models/notification.model";
import { IApplicationState } from "store/state.model";

import { removeNotification } from "./store/notifier.action";
import { styles } from "./styles";

interface IStoreProps {
  notifications: INotification[];
}

interface IDispatchProps {
  removeNotification: (arg: string) => void;
}

interface IProps extends WithStyles<typeof styles>, IStoreProps, IDispatchProps {
  autoHideDuration?: number;
}

class NotifierComponent extends React.PureComponent<IProps> {
  public handleClose = (id: string): any => (_e: React.ChangeEvent, reason: string) => {
    const { removeNotification } = this.props;
    if (reason === "clickaway") {
      return;
    }
    removeNotification(id);
  };

  public render() {
    const { classes, notifications, autoHideDuration = NUMBERS.THREE_THOUSAND } = this.props;
    return (
      <div className={classes.root}>
        {notifications.map(notification => (
          <Snackbar
            key={notification.id}
            classes={{
              root: classes.snackbar
            }}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={notification.active}
            onClose={this.handleClose(notification.id)}
          >
            <BaseNotification
              variant={notification.type === "Error" ? "error" : "success"}
              notification={notification}
              onClose={this.handleClose(notification.id)}
            />
          </Snackbar>
        ))}
      </div>
    );
  }
}

const mapStateToprops = (state: IApplicationState) => ({
  notifications: state.notifications
});

const mapDispatchToProps = {
  removeNotification
};

export const Notifier = withStyles(styles)(
  connect<IStoreProps, IDispatchProps>(mapStateToprops, mapDispatchToProps)(NotifierComponent)
);
