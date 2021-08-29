import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

const ICON_SIZE = 25;

export const styles = (theme?: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100% - 80px)"
    },
    sideMenuText: {
      fontSize: 16
    },
    item: {
      paddingTop: 15,
      paddingBottom: 15,
      "&$selected, &$selected:hover": {
        backgroundColor: theme.colors.SIDE_BAR_ITEM_SELECTED_COLOR,
        "&::before": {
          content: "''",
          position: "absolute",
          width: 4,
          height: "100%",
          backgroundColor: theme.colors.BUTTON_PRIMARY_COLOR
        }
      },
      "&:hover": {
        backgroundColor: theme.colors.SIDE_BAR_ITEM_SELECTED_COLOR
      }
    },
    icon: {
      fontSize: ICON_SIZE,
      marginLeft: Math.ceil((theme.sizes.SIDEBAR_WIDTH - ICON_SIZE) / 2)
    },
    userNameHidden: {
      opacity: 0
    },
    bottomListItem: {
      marginTop: "auto"
    },
    selected: {}
  });
