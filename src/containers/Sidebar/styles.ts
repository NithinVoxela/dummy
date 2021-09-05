import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    mobileDrawer: {
      width: 256
    },
    desktopDrawer: {
      width: 256,
      top: 64,
      height: "calc(100% - 64px)"
    },
    avatar: {
      cursor: "pointer",
      width: 64,
      height: 64
    }
  });
