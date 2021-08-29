import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

import { NUMBERS } from "configs/constants";

export const styles = (theme?: Theme) => {
  return createStyles({
    root: {
      position: "absolute",
      maxWidth: `calc(100% - ${NUMBERS.HUNDRED.toString()}px)`,
      top: 24,
      left: "auto",
      right: 24,
      zIndex: theme.zIndex.snackbar
    },
    snackbar: {
      position: "static"
    }
  });
};
