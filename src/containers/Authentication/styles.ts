import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      padding: "1.5em 4em",
      margin: "auto"
    },
    footer: {
      position: "absolute",
      bottom: ".75em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    separator: {
      padding: "0.5em"
    }
  });
});
