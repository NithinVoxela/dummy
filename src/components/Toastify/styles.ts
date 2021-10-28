import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%"
    },
    action: {
      float: "right"
    }
  });
