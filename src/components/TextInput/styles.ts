import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    label: {
      fontSize: 16,
      fontWeight: 500,
      minHeight: 28,
      "& .icon": {
        fontSize: 21,
        marginRight: 10
      },
      display: "flex",
      alignItems: "center"
    }
  });
