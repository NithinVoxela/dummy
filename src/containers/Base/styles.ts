import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const styles = (theme?: Theme) =>
  createStyles({
    "@global": {
      body: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
      },
      "*": {
        scrollbarWidth: "thin",
        scrollbarColor: "#E1E4E5 #FFF"
      },
      "*::-webkit-scrollbar-corner": {
        backgroundColor: "#FFF"
      },
      "*::-webkit-scrollbar, *.scrollHidden::-webkit-scrollbar": {
        width: 0,
        height: 0,
        backgroundColor: "#FFF"
      },
      "*:hover::-webkit-scrollbar, *.scrollVisible::-webkit-scrollbar": {
        width: 9,
        height: 9
      },
      "*::-webkit-scrollbar-track": {
        borderRadius: 16
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "#ABB0B6",
        borderRadius: 16,
        cursor: "pointer",
        border: "1px solid #FFF"
      }
    },
    root: {
      display: "flex",
      width: "100%",
      overflow: "hidden"
    },
    content: {
      background: "#ABB0B6",
      display: "flex",
      flexGrow: 1,
      flexFlow: "column",
      overflowX: "auto"
    },
    mainContent: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      zIndex: theme.zIndex.appBar + 1,
      overflow: "auto",
      transform: "translate(0)",
      padding: 10
    }
  });
