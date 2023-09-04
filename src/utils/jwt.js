import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

/**
 *
 * @param {*} accessToken
 * @returns true if token expires in 365 days
 */
const shuoldRefreshToken = (accessToken) => {
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp - currentTime < 31536000;
};

const setSession = (accessToken) => {
  if (accessToken) {
    const authenticationHeaders = {};
    authenticationHeaders['X-AuthToken'] = accessToken;
    axios.defaults.headers.common = authenticationHeaders;
  } else {
    delete axios.defaults.headers.common['X-AuthToken'];
  }
};

export { isValidToken, setSession, verify, sign, shuoldRefreshToken };
