import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const styles = (theme?: Theme) =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%"
      },
      body: {
        backgroundColor: "#f4f6f8",
        height: "100%",
        width: "100%"
      },
      a: {
        textDecoration: "none"
      },
      "#root": {
        height: "100%",
        width: "100%"
      }
    },
    root: {
      backgroundColor: theme.palette.background.default,
      display: "flex",
      height: "100%",
      overflow: "hidden",
      width: "100%"
    },
    wrapper: {
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden",
      paddingTop: 64,
      [theme.breakpoints.up("lg")]: {
        paddingLeft: 256
      }
    },
    container: {
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden"
    },
    content: {
      flex: "1 1 auto",
      height: "100%",
      overflow: "auto"
    }
  });
