import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const styles = (theme: Theme) =>
  createStyles({
    appTopBarSmall: {
      boxShadow: "none",
      background: theme.colors.TOP_BAR_COLOR,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appTopToolBarSmall: {
      padding: "unset",
      alignItems: "flex-end",
      minHeight: "auto",
      [theme.breakpoints.up("md")]: {
        padding: "0 24px",
        alignItems: "flex-end"
      }
    }
  });
