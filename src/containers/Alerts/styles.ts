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
      paddingBottom: 34,
      flexWrap: "wrap",
      flexGrow: 1
    },
    searchContainer: {
      height: 50,
      marginBottom: 4
    },
    formControl: {
      width: 240,
      padding: 8,
      borderRadius: 8,
      backgroundColor: "rgba(0, 0, 0, 0.09)"
    },
    label: {
      marginTop: 8,
      minHeight: 28,
      marginLeft: 8
    },
    filterContainer: {
      marginBottom: 16
    }
  });
