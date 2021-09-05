import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  to: string;
}

export const withPrevPath = <T extends {}>(
  RouterLink: React.ComponentType<T>,
  options: { withForwardRefWrapper?: boolean } = {}
) => {
  const routerLinkComponent = React.forwardRef((props: T & IProps, ref: any) => {
    let path;
    if (typeof props.to === "object") {
      path = { ...props.to, state: { prevPath: window.location.pathname } };
    } else {
      path = { pathname: props.to, state: { prevPath: window.location.pathname } };
    }

    if (options.withForwardRefWrapper) {
      return (
        <span ref={ref}>
          <RouterLink {...(props as T)} to={path} />
        </span>
      );
    }

    return <RouterLink {...(props as T)} to={path} ref={ref} />;
  });
  const displayName = RouterLink.displayName || RouterLink.name || "RouterLink";
  routerLinkComponent.displayName = `withPrevPath${displayName}`;
  return routerLinkComponent;
};

export const RouterLink = withPrevPath(Link);
