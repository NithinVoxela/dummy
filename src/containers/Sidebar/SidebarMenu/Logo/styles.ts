import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

const LOGO_SIZE = 34;

export const styles = (theme?: Theme) =>
  createStyles({
    root: {
      minHeight: 90
    },
    logoContainer: {
      position: "absolute",
      overflow: "hidden",
      height: 44,
      width: `calc(100% - ${(theme.sizes.SIDEBAR_WIDTH - LOGO_SIZE) / 2}px)`,
      animation: `$animate-logo-expanded-logoContainer ${theme.transitions.duration.standard}ms`
    },
    logoContainerCollapsed: {
      height: 48,
      width: 48,
      animation: `$animate-logo-collapsed-logoContainer ${theme.transitions.duration.standard}ms`
    },
    logoCollapsed: {
      position: "absolute",
      height: 44,
      top: 5,
      left: 5,
      animation: `$animate-logo-collapsed ${theme.transitions.duration.standard}ms`
    },
    logoExpanded: {
      position: "absolute",
      height: 56,
      animation: `$animate-logo-expanded ${theme.transitions.duration.standard}ms`,
      left: 72
    },
    "@keyframes animate-logo-expanded-logoContainer": {
      from: {
        height: 34,
        width: 34
      },
      to: {
        height: 44,
        width: "100%"
      }
    },
    "@keyframes animate-logo-collapsed-logoContainer": {
      from: {
        height: 44,
        width: "100%"
      },
      to: {
        height: 34,
        width: 34
      }
    },
    "@keyframes animate-logo-expanded": {
      from: {
        left: -70
      },
      to: {
        left: 0
      }
    },
    "@keyframes animate-logo-collapsed": {
      from: {
        left: 0
      },
      to: {
        left: -70
      }
    }
  });
