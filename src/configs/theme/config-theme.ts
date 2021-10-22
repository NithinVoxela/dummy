import { blue, green, grey, red } from "@material-ui/core/colors";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { breakpoints } from "./breakpoints";
import { overrides } from "./overrides";
import { props } from "./props";
import { shadows } from "./shadows";
import { typography } from "./typography";

const lightVariant = {
  name: "Light",
  palette: {
    primary: {
      main: "#1e88e5",
      contrastText: "#FFF"
    },
    secondary: {
      main: blue[600],
      contrastText: "#FFF"
    }
  },
  header: {
    color: grey[200],
    background: "#1e88e5",
    search: {
      color: grey[100]
    },
    indicator: {
      background: red[700]
    }
  },
  sidebar: {
    color: "#6b778c",
    background: "#FFF",
    header: {
      color: "#FFF",
      background: "#1e88e5",
      brand: {
        color: "#FFFFFF"
      }
    },
    footer: {
      color: "#6b778c",
      background: grey[100],
      online: {
        background: green[500]
      }
    },
    category: {
      fontWeight: 600
    },
    badge: {
      color: "#FFF",
      background: green[600]
    }
  },
  body: {
    background: "#f4f6f8"
  }
};

const createAppTheme = () => {
  return createMuiTheme({
    spacing: 4,
    breakpoints,
    overrides,
    props,
    typography,
    shadows,
    body: lightVariant.body,
    header: lightVariant.header,
    palette: lightVariant.palette,
    sidebar: lightVariant.sidebar
  });
};

export const configTheme = createAppTheme;

declare module "@material-ui/core/styles/createMuiTheme" {
  /* eslint-disable @typescript-eslint/naming-convention */
  interface Theme extends ICustomTheme {}
  interface ThemeOptions extends ICustomTheme {}
}
