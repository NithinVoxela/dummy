import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const styles = (theme?: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.colors.SIDE_BAR_COLOR,
      cursor: "pointer",
      overflowX: "hidden"
    },
    sidebarButtons: {
      // color: theme.colors.FOURTH_COLOR
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: theme.sizes.SIDEBAR_OPENED_WIDTH,
      boxShadow: "3px 0 12px 0 rgba(0, 0, 0, 0.4)",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.sharp
      })
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.sharp
      }),
      width: theme.sizes.SIDEBAR_WIDTH
    },
    draperPaperSmall: {
      overflowX: "hidden",
      maxWidth: "80%"
    }
  });
