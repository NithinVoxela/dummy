import { COLORS } from "configs/theme/colors";

export class DefaultTheme implements ICustomTheme {
  public colors: IColors;
  public sizes: ISizes;
  public shadow: IShadow;

  public constructor(overrideTheme: any = {}) {
    this._initColors(overrideTheme);
    this._initSizes(overrideTheme);
    this._initShadow();
  }

  private readonly _initColors = (overrideTheme: any) => {
    this.colors = {
      SIDE_BAR_COLOR: COLORS.WHITE_FFF,
      SIDE_BAR_ITEM_SELECTED_COLOR: COLORS.PERANO,
      BUTTON_PRIMARY_COLOR: COLORS.CORNFLOWER_BLUE,
      TOP_BAR_COLOR: COLORS.CORNFLOWER_BLUE,
      SEPARATOR_COLOR: COLORS.CORNFLOWER_3BEEDD,
      TOOLTIP_BORDER_COLOR: COLORS.WHITE_FFF,
      ...overrideTheme.iiotColors
    };
  };

  private readonly _initSizes = (overrideTheme: any) => {
    this.sizes = {
      SIDEBAR_OPENED_WIDTH: 330,
      SIDEBAR_WIDTH: 60,
      TOP_PRIMARY_BAR_HEIGHT: 84,
      TOP_PRIMARY_BAR_MOBILE_HEIGHT: 56,
      TOP_HEADER_ROW_HEIGHT: 67,
      FONT_SIZE_XS: 12,
      FONT_SIZE_SM: 14,
      FONT_SIZE_MD: 16,
      FONT_SIZE_LG: 18,
      FONT_SIZE_XL: 20,
      ...overrideTheme.iiotSizes
    };
  };

  private readonly _initShadow = () => {
    this.shadow = {
      PRIMARY_TRANSPARENCY: "0.25"
    };
  };
}

interface IColors {
  SIDE_BAR_COLOR: string;
  SIDE_BAR_ITEM_SELECTED_COLOR: string;
  BUTTON_PRIMARY_COLOR: string;
  TOP_BAR_COLOR: string;
  SEPARATOR_COLOR: string;
  TOOLTIP_BORDER_COLOR: string;
}

interface ISizes {
  SIDEBAR_OPENED_WIDTH: number;
  SIDEBAR_WIDTH: number;
  TOP_PRIMARY_BAR_HEIGHT: number;
  TOP_PRIMARY_BAR_MOBILE_HEIGHT: number;
  TOP_HEADER_ROW_HEIGHT: number;
  FONT_SIZE_XS: number;
  FONT_SIZE_SM: number;
  FONT_SIZE_MD: number;
  FONT_SIZE_LG: number;
  FONT_SIZE_XL: number;
}

interface IShadow {
  PRIMARY_TRANSPARENCY: "0.25";
}

export interface ICustomTheme {
  sizes: ISizes;
  colors: IColors;
  shadow: IShadow;
}
