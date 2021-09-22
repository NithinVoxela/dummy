import { green } from "@material-ui/core/colors";
import { createStyles } from "@material-ui/core/styles";

export const styles = (theme: any) =>
  createStyles({
    drawer: {
      borderRight: 0,
      "& > div": {
        borderRight: 0
      },
      position: "relative",
      height: "100%"
    },
    brand: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.sidebar.header.color,
      backgroundColor: theme.sidebar.header.background,
      fontFamily: theme.typography.fontFamily,
      minHeight: 56,
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),

      [theme.breakpoints.up("sm")]: {
        minHeight: 64
      }
    },
    brandIcon: {
      marginRight: theme.spacing(2),
      color: theme.sidebar.header.brand.color
    },
    brandChip: {
      backgroundColor: green[700],
      borderRadius: 5,
      color: theme.palette.common.white,
      fontSize: "60%",
      height: 20,
      marginLeft: 2,
      marginBottom: 1,
      padding: "4px 0",

      "& span": {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5)
      }
    },
    scrollContainer: {
      backgroundColor: theme.sidebar.background,
      borderRight: "1px solid rgba(0, 0, 0, 0.12)",
      boxShadow: "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(63 63 68 / 15%) 0px 1px 2px 0px",
      height: "100%"
    }
  });
