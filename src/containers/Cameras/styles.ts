import { createStyles } from "@material-ui/core";
import { height } from "@material-ui/system";

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
      minWidth: 100,
      flexShrink: 0,
      marginLeft: 24,
      marginRight: 12
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
      height: 56,
      border: "1px solid #e8e8e8",
      padding: "14px 14px",
      borderRadius: 4,
      width: "47%",
      flexShrink: 0,
      marginLeft: 24,
      marginTop: 16
    },
    searchIcon: {
      background: "transparent",
      "&:hover": {
        background: "transparent !important"
      }
    },
    linkBtn: {
      padding: 0,
      minWidth: "auto",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        background: "transparent !important"
      }
    },
    appCard: {
      marginRight: 24
    },
    noData: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%"
    },
    appSettingform: {
      padding: "24px 40px"
    },
    appNotifications: {
      marginTop: 16
    },
    checkbox: {
      height: 30,
      boxSizing: "border-box",
      "&:hover": {
        background: "transparent !important"
      }
    },
    fieldLable: {
      paddingBottom: 4
    },
    saveButton: {
      minWidth: 100,
      marginRight: 12
    },
    emailInput: {
      minHeight: 50
    }
  });
};
