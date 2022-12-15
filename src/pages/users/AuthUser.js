// import React from 'react';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/JWTContext';

const AuthUser = () => {
  const authContext = useContext(AuthContext);

  //   if (authContext?.user?.role === 'us') {
  //     isAuth = true;
  //   }

  //   const renderUsers = () => {
  //     if (authContext?.user?.role === 'us') {
  //       isAuth = true;
  //     }
  //   };
  return <>{console.log(authContext?.user?.role)}</>;
};
export default AuthUser;
