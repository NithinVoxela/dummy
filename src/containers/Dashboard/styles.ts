import { createStyles, Theme } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      minHeight: 150
    },
    button: {
      padding: 8
    },
    smallButton: {
      padding: 4,
      minWidth: 0,
      marginRight: 2,

      "&svg": {
        width: "0.9em",
        height: "0.9em"
      }
    },
    divider: {
      marginTop: 6,
      marginBottom: 6
    },
    typography: {
      padding: 8
    },
    percentage: {
      color: theme.palette.grey[600],

      "&span": {
        paddingRight: 10,
        fontWeight: theme.typography.fontWeightBold
      }
    },
    statsChip: {
      position: "absolute",
      top: 16,
      right: 16,
      height: 20,
      padding: "4px 0",
      fontSize: "85%",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),

      "&span": {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      }
    },
    statsContent: {
      position: "relative",

      "&:last-child": {
        paddingBottom: theme.spacing(4)
      }
    },
    chartWrapper: {
      height: 378
    },
    doughnutIChartWrapper: {
      height: 168,
      position: "relative"
    },
    doughnutInner: {
      width: "100%",
      position: "absolute",
      top: "50%",
      left: 0,
      marginTop: -22,
      textAlign: "center",
      zIndex: 0
    },
    tableRow: {
      height: 42
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
    },
    greenText: {
      color: green[400],
      fontWeight: theme.typography.fontWeightMedium
    },
    redText: {
      color: red[400],
      fontWeight: theme.typography.fontWeightMedium
    },
    card: {
      cursor: "pointer",
      minHeight: 150,
      height: "100%"
    }
  });
