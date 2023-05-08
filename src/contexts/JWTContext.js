import { createContext, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

// utils
import axios from '../utils/axios';
import { isValidToken, shuoldRefreshToken, setSession } from '../utils/jwt';
import { registerDevice } from '../redux/slices/auth';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  userConfiguration: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, userConfiguration } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      userConfiguration,
    };
  },
  LOGIN: (state, action) => {
    const { user, userConfiguration } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      userConfiguration,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  IMPERSONATE: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
  IMPERSONATE_LOGOUT: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  impersonate: () => Promise.resolve(),
  impersonateLogout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = useTranslation();

  useEffect(() => {
    const initialize = async () => {
      try {
        let user = JSON.parse(window.localStorage.getItem('user'));
        let isAuthenticated = false;
        if (user) {
          if (user.token && isValidToken(user.token)) {
            if (shuoldRefreshToken(user.token)) {
              setSession(user.token);
              const response = await axios.put('refreshToken?requireExternalSystemsSupport=true', {});
              user = response.data;
            }

            initializeUserSettings(user);
            isAuthenticated = true;
          } else {
            clearUserSettings();
            user = null;
          }
        }

        let userConfiguration = JSON.parse(window.localStorage.getItem('userConfiguration'));
        if (!userConfiguration) {
          userConfiguration = initializeUserConfiguration();
        }

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated,
            user,
            userConfiguration,
          },
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            userConfiguration: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('login?requireExternalSystemsSupport=true', {
      userName: email,
      userPassword: Buffer.from(password, 'utf8').toString('base64'),
    });
    const user = response.data;
    initializeUserSettings(user);
    const userConfiguration = initializeUserConfiguration();

    const firebaseToken = window.sessionStorage.getItem('messagingToken');

    if (firebaseToken) {
      await registerDevice({
        imeiNumber: 'imeiNumber',
        fireBaseId: window.sessionStorage.getItem('messagingToken'),
        deviceType: 'WEB',
      });
    }

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        userConfiguration,
      },
    });
  };

  const impersonate = async (tenantId) => {
    const response = await axios.post('impersonate?requireExternalSystemsSupport=true', {
      tenantId,
    });
    const user = response.data;
    initializeUserSettings(user);

    dispatch({
      type: 'IMPERSONATE',
      payload: {
        user,
      },
    });
  };

  const impersonateLogout = async () => {
    const response = await axios.post('impersonate/logout');
    const user = response.data;
    initializeUserSettings(user);

    dispatch({
      type: 'IMPERSONATE_LOGOUT',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    clearUserSettings();
    dispatch({ type: 'LOGOUT' });
  };

  const initializeUserSettings = (user) => {
    setSession(user.token);
    user.displayName = `${user?.firstName} ${user?.lastName}`;
    window.localStorage.setItem('user', JSON.stringify(user));
    i18n.changeLanguage(user.locale);
    moment.tz.setDefault(user.timezone);
  };

  const initializeUserConfiguration = () => {
    const userConfiguration = {
      pageSize: {
        default: 10,
      },
    };

    localStorage.setItem('userConfiguration', JSON.stringify(userConfiguration));
    return userConfiguration;
  };

  const clearUserSettings = () => {
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        impersonate,
        impersonateLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
