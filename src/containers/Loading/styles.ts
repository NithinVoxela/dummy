import { Theme, createStyles } from "@material-ui/core";

export const styles = (_theme?: Theme) =>
  createStyles({
    loadingContainer: {
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    }
  });
