import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    card: {
      maxWidth: 300
    },
    image: {
      height: 225
    },
    video: {
      height: "100%",
      minHeight: 225
    },
    cardInfo: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
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
