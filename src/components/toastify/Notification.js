import { Link, Typography, Box } from "@mui/material";
import * as React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import useLocales from '../../hooks/useLocales';



const NavLink = React.forwardRef((props, ref) => <RouterNavLink innerRef={ref} {...props} />);

export default function Notification ({ notification }) {
  const { translate } = useLocales();
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%"
    }}>
      <Box style={{ width: "100%" }}>
        <Typography variant="button">{notification?.notification?.title}</Typography>
        <Typography variant="body2">{notification?.notification?.body}</Typography>
        <div>
          <Link
            color="primary"
            component={NavLink}
            exact
            to={notification?.notification?.actionUrl || `/alerts/${notification?.data?.objectId}`}
            variant="subtitle2"
            underline="always"
            style={{ float: "right" }}
          >
            {notification?.notification?.actionLabel ||
              translate("app.view-details-label")}
            ...
          </Link>
        </div>
      </Box>
    </Box>
  );
};
