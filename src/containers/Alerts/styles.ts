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
    }
  });
