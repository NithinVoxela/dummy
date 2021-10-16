import { createStyles } from "@material-ui/core";

export const styles = () => {
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
    },
    divider: {
      marginTop: 24,
      marginBottom: 24
    },
    topbarContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingRight: 34,
      paddingBottom: 0,
      flexWrap: "wrap",
      flexGrow: 1
    },
    searchContainer: {
      height: 50,
      marginBottom: 4,
      boxShadow: "none",
      border: "1px solid #e8e8e8"
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
    },
    filterContent: {
      paddingBottom: "16px !important"
    },
    filterContainer: {
      marginBottom: 24
    }
  });
};
