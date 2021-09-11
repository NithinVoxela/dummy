import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const drawerWidth = 260;

export const styles = (theme?: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
      width: "100%"
    },
    appContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    mainContent: {
      flex: 1,
      background: theme.body.background,

      "@media all and(-ms - high - contrast: none), (-ms - high - contrast: active)": {
        flex: "none"
      },

      ".MuiPaper - root.MuiPaper - root": {
        boxShadow: "none"
      }
    }
  });
