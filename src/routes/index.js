import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/cortexa')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const { isAuthenticated } = useAuth();
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'cortexa',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
                        
        
        {
          path: 'cameras',
          children: [
            { element: <Navigate to="/cortexa/cameras/list" replace />, index: true },        
            { path: 'list', element: <CameraList /> },   
            { path: 'new', element: <CameraCreate /> },    
            { path: 'edit/:cameraId', element: <CameraCreate /> },      
            { path: 'apps/:cameraId', element: <CameraApps /> },
            { path: 'apps/:cameraId/settings/:appId', element: <CameraAppSettings /> },
          ],
        },

        {
          path: 'alerts',
          children: [
            { element: <Navigate to="/cortexa/alerts/list" replace />, index: true },        
            { path: 'list', element: <AlertList /> },   
            { path: 'detail/:alertId', element: <AlertDetail /> },           
          ],
        },              
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [        
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: isAuthenticated ? <Navigate to="/cortexa" /> : <Navigate to="/cortexa/dashboard" />,      
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));






const CameraList = Loadable(lazy(() => import('../pages/cameras/CameraList')));
const CameraCreate = Loadable(lazy(() => import('../pages/cameras/CameraCreate')));
const CameraApps = Loadable(lazy(() => import('../pages/cameras/CameraApps')));
const CameraAppSettings = Loadable(lazy(() => import('../pages/cameras/CameraAppSettings')));
const AlertList = Loadable(lazy(() => import('../pages/alerts/AlertList')));
const AlertDetail = Loadable(lazy(() => import('../pages/alerts/AlertDetail')));
const Dashboard = Loadable(lazy(() => import('../pages/cortexaDashboard/Dashboard')));
// Main

const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));