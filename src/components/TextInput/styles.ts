import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    label: {
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
    inputRoot: {
      height: 50,
      backgroundColor: "#fff",
      border: "1px solid rgba(0, 0, 0, 0.09)",

      "&:hover": {
        backgroundColor: "#fff"
      }
    }
  });
