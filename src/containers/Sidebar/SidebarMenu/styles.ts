import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { fontWeight } from "@material-ui/system";
import { darken, rgba } from "polished";

export const styles = (theme?: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.sidebar.background
    },
    items: {
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5)
    },
    item: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(5),
      fontWeight: theme.typography.fontWeightRegular,

      "& svg": {
        color: theme.sidebar.color,
        fontSize: 20,
        width: 20,
        height: 20,
        opacity: 1
      },

      "&:hover": {
        background: rgba(0, 0, 0, 0.08)
      },

      "&.active": {
        backgroundColor: darken(0.05, theme.sidebar.background),

        "& span": {
          color: theme.sidebar.color,
          fontWeight:  theme.typography.fontWeightMedium
        }
      }
    },
    itemText: {
      color: theme.sidebar.color,
      "& span": {
        fontSize: theme.typography.body1.fontSize
      },
      marginTop: 0,
      marginBottom: 0
    },
    button: {
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      justifyContent: "flex-start",
      letterSpacing: 0,
      padding: "10px 8px",
      textTransform: "none",
      width: "100%"
    },
    icon: {
      marginRight: theme.spacing(4)
    }
  });
