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
      color: theme.sidebar.header.brand.color,
      maxHeight: 36
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
      height: "100%",
      borderRight: "1px solid #e0e0e0"
    }
  });
