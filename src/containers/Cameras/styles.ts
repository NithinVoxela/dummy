import { createStyles } from "@material-ui/core";

export const styles = () => {
  return createStyles({
    root: {
      padding: "1.5em 4em",
      margin: "auto",
      boxShadow: "rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px"
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
    },
    divider: {
      marginTop: 24,
      marginBottom: 24
    },
    searchContainer: {
      height: 50,
      marginBottom: 4
    },
    textfield: {
      width: "45%",
      flexShrink: 0,
      marginLeft: 15
    },
    submitButton: {
      width: 100,
      flexShrink: 0,
      marginLeft: 15
    }
  });
};
