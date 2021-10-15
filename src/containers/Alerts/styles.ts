import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme?: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    divider: {
      marginTop: 24,
      marginBottom: 24
    },
    noResults: {
      textAlign: "center",
      borderBottom: 0,
      padding: theme.spacing()
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
    formControl: {
      width: 240
      // "& .MuiSelect-select:focus": {
      //   backgroundColor: "#fff",
      //   border: "1px solid rgba(0, 0, 0, 0.09)",
      //   borderLeft: 0,
      //   outline: "none"
      // }
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
      "& .icon": {
        fontSize: 21,
        marginRight: 10
      },
      display: "flex",
      alignItems: "center"
    },
    focused: {
      // backgroundColor: "#fff"
      // display: "none"
      outline: "none",
      boxShadow: "none"
    },
    filterContainer: {
      marginBottom: 30
    },
    inputRoot: {
      height: 50,
      backgroundColor: "#fff",
      border: "1px solid rgba(0, 0, 0, 0.09)",

      "&:hover": {
        backgroundColor: "#fff"
      }
    },
    filterContent: {
      paddingBottom: "16px !important"
    }
  });
