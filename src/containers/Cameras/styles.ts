import { createStyles } from "@material-ui/core";

export const styles = () => {
  return createStyles({
    root: {
      padding: "1.5em 4em",
      margin: "auto",
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
      width: "47%",
      flexShrink: 0,
      marginLeft: 24
    },
    submitButton: {
      width: 100,
      flexShrink: 0,
      marginLeft: 24
    },
    form: {
      padding: "16px"
    }
  });
};
