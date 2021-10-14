import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    card: {
      maxWidth: 300,
      boxShadow: "0  5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2)"
    },
    image: {
      height: 225
    },
    video: {
      height: "100%"
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
