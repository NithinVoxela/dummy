import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    card: {
      maxWidth: 345,
      boxShadow: "0  5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2)"
    },
    image: {
      height: 0,
      paddingTop: "56.25%"
    },
    video: {
      height: "100%"
    },
    header: {
      display: "flex"
    },
    alertTime: {
      flex: 5
    },
    severity: {
      flex: 1
    }
  });
