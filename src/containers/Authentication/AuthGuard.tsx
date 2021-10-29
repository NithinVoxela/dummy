import * as React from "react";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter, useLocation, useHistory } from "react-router-dom";

import { routes } from "configs/routes/routes.config";
import { IUserAccount } from "models/user.model";
import { HttpServiceFactory } from "services/http/http.serviceFactory";
import { IApplicationState } from "store/state.model";
import { getUserAccount } from "store/userAccount/userAccount.selector";
import { userDeviceRegistration } from "store/userAccount/userAccount.actions";
import { DEVICE_TYPE } from "../../Constants";

import { Login } from "./Login";

interface IStateToProps {
  user: IUserAccount;
}

interface stateType {
  from: { pathname: string };
}

interface IProps extends IStateToProps, RouteComponentProps {
  children: JSX.Element;
}

const AuthGuardComponent: React.FunctionComponent<IProps> = ({ user, children }) => {
  const { state } = useLocation<stateType>();
  const history = useHistory();
  const dispatch = useDispatch();

  const registerDevice = () => {
    const params = {
      deviceType: DEVICE_TYPE,
      fireBaseId: sessionStorage.getItem("messagingToken")
    };
    dispatch(userDeviceRegistration(params));
  };

  useEffect(() => {
    HttpServiceFactory.createServices();
    if (state?.from) {
      history.push(state.from);
    } else {
      history.push("/");
    }
    if (user?.userName) {
      registerDevice();
    }
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
            <Redirect
              to={{
                pathname: routes.login.to,
                state: { from: componentProps.location }
              }}
            />
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
