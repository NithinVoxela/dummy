import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

import { NUMBERS } from "configs/constants";

export const styles = (theme?: Theme) =>
  createStyles({
    root: {
      background: "transparent",
      width: "100%",
      position: "relative",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between"
    },
    menuButton: {
      width: 60,
      marginRight: theme.spacing(NUMBERS.TWO),
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    userName: {
      padding: theme.spacing(),
      fontSize: theme.sizes.FONT_SIZE_MD,
      cursor: "context-menu"
    },
    userSettingButtons: {
      padding: theme.spacing(),
      cursor: "pointer",
      fontSize: theme.sizes.FONT_SIZE_XL
    },
    userSettingButtonsHighlighted: {
      boxShadow: `3px 0 6px 0 rgba(0, 0, 0, ${theme.shadow.PRIMARY_TRANSPARENCY})`
    },
    userSettingButtonsContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end"
    },
    pipeSeparator: {
      color: theme.colors.SEPARATOR_COLOR,
      marginTop: 7,
      cursor: "context-menu"
    },
    menuListContainer: {
      backgroundColor: theme.colors.TOOLTIP_BORDER_COLOR,
      marginTop: theme.spacing(4),
      borderRadius: 0,
      border: `2px solid ${theme.colors.TOP_BAR_COLOR}`
    }
  });
