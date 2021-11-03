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
      marginTop: 8,
      marginBottom: 16
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
      height: 40,
      marginBottom: 4,
      boxShadow: "none",
      border: "1px solid #e8e8e8",
      width: 400,
      borderRadius: 6
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
      marginBottom: 16
    },
    selectField: {
      marginTop: 16,
      height: 56,
      border: "1px solid #e8e8e8",
      padding: "18.5px 14px",
      borderRadius: 4,
      width: "47%",
      flexShrink: 0,
      marginLeft: 24
    },
    searchIcon: {
      background: "transparent",
      "&:hover": {
        background: "transparent !important"
      }
    }
  });
};
