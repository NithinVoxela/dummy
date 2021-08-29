import SvgIcon from "@material-ui/core/SvgIcon";
import classNames from "classnames";
import * as React from "react";

import Alert from "assets/icons/alert.component.svg";
import Dashboard from "assets/icons/dashboard.component.svg";

export const withSvgIcon = (Icon: any, viewbox?: string) => {
  const iconComponent = ({ className, ...props }: any) => {
    return (
      <SvgIcon {...props} className={classNames(className, "Icon")} viewBox={viewbox}>
        <Icon />
      </SvgIcon>
    );
  };
  return iconComponent;
};

export const DashboardIcon = withSvgIcon(Dashboard);
export const AlertIcon = withSvgIcon(Alert);
