import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    appBar: {
      background: theme.header.background,
      color: theme.header.color,
      boxShadow: theme.shadows[1]
    },
    badge: {
      cursor: "pointer",
      marginRight: theme.spacing(1)
    },
    alertCount: {
      cursor: "pointer",
      marginRight: theme.spacing(6)
    },
    small: {
      width: theme.spacing(8.5),
      height: theme.spacing(8.5)
    }
  });
});
