import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
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
        { path: 'analytics', element: <Analytics /> },

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
          path: 'users',
          children: [
            { element: <Navigate to="/cortexa/users/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: 'edit/:userId', element: <UserCreate /> },
          ],
        },
        {
          path: 'tenants',
          children: [
            { element: <Navigate to="/cortexa/tenants/list" replace />, index: true },
            { path: 'list', element: <TenantList /> },
            { path: 'new', element: <TenantCreate /> },
            { path: 'edit/:tenantId', element: <TenantCreate /> },
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
        {
          path: 'recordings',
          children: [
            { element: <Navigate to="/cortexa/recordings/list" replace />, index: true },
            { path: 'list', element: <RecordingList /> },
            { path: 'detail/:recordingId', element: <RecordingDetail /> },
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
const RecordingList = Loadable(lazy(() => import('../pages/recordings/RecordingList')));
const RecordingDetail = Loadable(lazy(() => import('../pages/recordings/RecordingDetail')));
const Dashboard = Loadable(lazy(() => import('../pages/cortexaDashboard/Dashboard')));
const Analytics = Loadable(lazy(() => import('../pages/analytics/Analytics')));
const UserList = Loadable(lazy(() => import('../pages/users/UserList')));
const UserCreate = Loadable(lazy(() => import('../pages/users/UserCreate')));
const TenantList = Loadable(lazy(() => import('../pages/tenant/TenantList')));
const TenantCreate = Loadable(lazy(() => import('../pages/tenant/TenantCreate')));
// Main

const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
