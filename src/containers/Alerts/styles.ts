import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme?: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    divider: {
      marginTop: 8,
      marginBottom: 16
    },
    noResults: {
      textAlign: "center",
      borderBottom: 0,
      padding: theme.spacing()
    },
    topbarContainer: {
      display: "flex",
      justifyContent: "flex-start",
      paddingRight: 34,
      paddingBottom: 0,
      flexWrap: "wrap",
      flexGrow: 1
    },
    searchContainer: {
      height: 52,
      boxShadow: "none",
      border: "1px solid #bdbec4",
      width: 340,
      marginRight: 24
    },
    formControl: {
      width: 300,
      "& .MuiSelect-select:focus": {
        backgroundColor: "unset"
      }
    },
    label: {
      marginTop: 0,
      minHeight: 28,
      marginLeft: 8
    },
    severityLabel: {
      fontSize: 14,
      fontWeight: 400,
      paddingBottom: 10,
      minHeight: 28,
      marginLeft: 0,
      "& .icon": {
        fontSize: 21
      },
      display: "flex",
      alignItems: "center"
    },
    focused: {
      outline: "none",
      boxShadow: "none"
    },
    filterContainer: {
      marginBottom: 12
    },
    inputRoot: {
      height: 50,
      backgroundColor: "#fff!important",
      border: "1px solid #bdbec4",
      borderRadius: 6,

      "&:hover": {
        backgroundColor: "#fff"
      }
    },
    filterContent: {
      paddingBottom: "16px !important"
    },
    icon: {
      marginRight: 16,
      "&:hover": {
        cursor: "pointer"
      }
    },
    alertSummary: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      padding: 24
    },
    mediaCard: {
      marginTop: 24,
      padding: 24,
      minHeight: 400
    },
    image: {
      minHeight: 400
    },
    video: {
      height: "100%",
      minHeight: 400
    },
    alertSummaryValue: {
      textAlign: "left",
      marginTop: 12
    },
    searchIcon: {
      background: "transparent",
      "&:hover": {
        background: "transparent !important"
      }
    },
    linkBtn: {
      padding: 0,
      "&:hover": {
        background: "transparent !important"
      }
    }
  });
