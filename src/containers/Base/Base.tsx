import { Hidden, Box, WithStyles, withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { isWidthUp, WithWidthProps } from "@material-ui/core/withWidth";
import * as React from "react";
import { useState } from "react";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";
import { toast } from "react-toastify";

import { Notification } from "components/Toastify";
import { Sidebar } from "containers/Sidebar";
import { TopBar } from "containers/TopBar";
import { translationService } from "services/translation/translation.service";
import { getAPIUrl } from "src/Constants";

import { styles } from "./styles";

interface IProps extends WithStyles, WithWidthProps {}

const SOCKET_URL = `${getAPIUrl()}ws-message`;

const notify = (notification: any) => toast(<Notification notification={notification} />);

const SubscribingComponent = () => {
  // Subscribe to /topic/test, and use handler for all received messages
  // Note that all subscriptions made through the library are automatically removed when their owning component gets unmounted.
  // If the STOMP connection itself is lost they are however restored on reconnect.
  // You can also supply an array as the first parameter, which will subscribe to all destinations in the array
  useSubscription("/topic/notify-ui-alert", message => {
    // setLastMessage(message.body));
    try {
      const body = JSON.parse(message.body);
      const payload = {
        data: {
          objectId: body.id
        },
        notification: {
          title: translationService.getMessageTranslation(`alerts-${body.type}-title-label`, "Activity detected"),
          body: `${translationService.getMessageTranslation(
            `alerts-${body.type}-desc-label`,
            "Activity detected on camera"
          )} ${body.cameraName}`,
        }
      };
      notify(payload);
    } catch (err) {}
  });
  return null;
};

const BaseComponent: React.FC<IProps> = ({ classes, children, width }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className={classes.root}>
      <div className={classes.drawer}>
        <Hidden mdUp implementation="js">
          <Sidebar
            PaperProps={{ style: { width: 260 } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar PaperProps={{ style: { width: 260 } }} />
        </Hidden>
      </div>
      <div className={classes.appContent}>
        <TopBar onDrawerToggle={handleDrawerToggle} />
        <Box style={{ padding: isWidthUp("lg", width) ? "40px" : "20px" }}>{children}</Box>
      </div>
      <StompSessionProvider
        url={SOCKET_URL}
        // All options supported by @stomp/stompjs can be used here
      >
        <SubscribingComponent />
      </StompSessionProvider>
    </div>
  );
};

export const Base = withWidth()(withStyles(styles)(BaseComponent));
