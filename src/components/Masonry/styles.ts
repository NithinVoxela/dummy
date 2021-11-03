import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    card: {
      width: 330
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
    },
    newBadge: {
      position: "absolute",
      top: 14,
      left: -22,
      height: 24,
      padding: "0px 16px",
      transform: "scale(1) translate(50%, 0%)",
      borderRadius: 4
    }
  });
