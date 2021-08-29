import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";

import { configTheme } from "configs/theme/config-theme";
import { getCustomTheme } from "configs/theme/themes";

interface IThemeProvider {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
  return <MuiThemeProvider theme={configTheme(getCustomTheme())}>{children}</MuiThemeProvider>;
};
