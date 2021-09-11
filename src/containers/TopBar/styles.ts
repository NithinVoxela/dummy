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
      marginRight: theme.spacing(1),
      "& span": {
        backgroundColor: theme.sidebar.footer.online.background,
        border: `1.5px solid ${theme.palette.common.white}`,
        height: 12,
        width: 12,
        borderRadius: "50%",
        right: "12%",
        top: "80%"
      }
    }
  });
});
