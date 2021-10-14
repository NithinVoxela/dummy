import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    dateTimePicker: {
      width: "100%",
      "& input": {
        cursor: "pointer"
      }
    },
    icon: {
      paddingTop: 12,
      fontSize: 34,
      "&:hover": {
        cursor: "pointer"
      }
    },
    tooltip: {
      maxWidth: "none",
      backgroundColor: "#FFF",
      border: "1px solid rgb(21, 101, 192)",
      color: "rgb(21, 101, 192)",
      lineHeight: 1.25
    },
    popper: {
      pointerEvents: "all",
      opacity: 1,
      marginTop: 15
    },
    calendarDisplayAliasContainer: {
      display: "inline-flex"
    },
    calendarViewIcon: {
      transform: "rotate(90deg)",
      margin: 8,
      padding: 2,
      fontSize: 18,
      cursor: "pointer"
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    minWidth_lg: {
      width: 360
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    minWidth_auto: {
      width: "100%"
    }
  });
