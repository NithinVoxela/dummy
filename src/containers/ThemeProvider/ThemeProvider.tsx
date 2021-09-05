import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";

import { configTheme } from "configs/theme/config-theme";

interface IThemeProvider {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
  return <MuiThemeProvider theme={configTheme()}>{children}</MuiThemeProvider>;
};
