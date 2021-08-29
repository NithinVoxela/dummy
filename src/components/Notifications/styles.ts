import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    root: {
      flexWrap: "nowrap",
      alignItems: "flex-start",
      margin: "8px 0",
      wordBreak: "break-word"
    },
    action: {
      color: "#FFF",
      opacity: 0.5,
      marginRight: -16
    },
    header: {
      color: "#FFF"
    },
    message: {
      color: "#FFF",
      fontSize: 15,
      lineHeight: 1.25,
      letterSpacing: 0.2
    },
    closeIcon: {
      fontSize: 18
    },
    closeButton: {
      padding: 6
    },
    error: {
      background: "#0096D5",
      width: 600
    }
  });
