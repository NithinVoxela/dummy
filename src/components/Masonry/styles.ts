import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    card: {
      maxWidth: 345
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
