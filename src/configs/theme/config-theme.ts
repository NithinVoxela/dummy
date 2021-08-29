import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { ICustomTheme } from "./customTheme.model";

const createAppTheme = (theme: ICustomTheme) => {
  return createMuiTheme({
    ...theme
  });
};

export const configTheme = createAppTheme;

declare module "@material-ui/core/styles/createMuiTheme" {
  /* eslint-disable @typescript-eslint/naming-convention */
  interface Theme extends ICustomTheme {}
  interface ThemeOptions extends ICustomTheme {}
}
