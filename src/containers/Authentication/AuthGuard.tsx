import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

import { routes } from "configs/routes/routes.config";
import { IUserAccount } from "models/user.model";
import { HttpServiceFactory } from "services/http/http.serviceFactory";
import { IApplicationState } from "store/state.model";
import { getUserAccount } from "store/userAccount/userAccount.selector";

import { Login } from "./Login";

interface IStateToProps {
  user: IUserAccount;
}

interface IProps extends IStateToProps, RouteComponentProps {
  children: JSX.Element;
}

const AuthGuardComponent: React.FunctionComponent<IProps> = ({ user, children }) => {
  useEffect(() => {
    HttpServiceFactory.createServices();
  }, [user]);
  return (
    <Switch>
      <Route path={routes.login.to} exact>
        {user.userName ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route
        render={componentProps => {
          return user.userName ? (
            children
          ) : (
            <Redirect to={{ pathname: routes.login.to, state: { from: componentProps.location } }} />
          );
        }}
      />
    </Switch>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  user: getUserAccount(state)
});

export const AuthGuard = withRouter(connect<IStateToProps>(mapStateToProps, null)(AuthGuardComponent));
