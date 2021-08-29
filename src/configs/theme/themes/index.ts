import { ICustomTheme } from "configs/theme/customTheme.model";

import { lightTheme } from "./lightTheme";

export const getCustomTheme = (): ICustomTheme => {
  return lightTheme;
};
