import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    root: {
      flexWrap: "nowrap",
      alignItems: "flex-start",
      margin: "8px 0",
      wordBreak: "break-word",
      background: "#EDF7ED",
      width: 400
    },
    action: {
      color: "#FFF",
      opacity: 0.5,
      marginRight: -16
    },
    header: {
      color: "#000"
    },
    message: {
      color: "#000",
      fontSize: 15,
      lineHeight: 1.25,
      letterSpacing: 0.2
    },
    closeIcon: {
      fontSize: 18,
      color: "#000"
    },
    closeButton: {
      padding: 6
    },
    error: {
      background: "#d32f2f",
      width: 400
    }
  });
