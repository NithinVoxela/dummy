// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/cortexa';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/dashboard'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    cameras: path(ROOTS_DASHBOARD, '/cameras/list'),
    users: path(ROOTS_DASHBOARD, '/users/list'),
    alerts: path(ROOTS_DASHBOARD, '/alerts/list'),
    recordings: path(ROOTS_DASHBOARD, '/recordings/list'),
    tenants: path(ROOTS_DASHBOARD, '/tenants/list'),
    agents: path(ROOTS_DASHBOARD, '/agents/list'),
    dashboard: path(ROOTS_DASHBOARD, '/dashboard'),
    units: path(ROOTS_DASHBOARD, '/units/list'),
  },
  cameras: {
    root: path(ROOTS_DASHBOARD, '/cameras'),
    editById: path(ROOTS_DASHBOARD, '/cameras/edit/:cameraId'),
    new: path(ROOTS_DASHBOARD, '/cameras/new'),
    apps: path(ROOTS_DASHBOARD, '/cameras/:id/apps'),
    list: path(ROOTS_DASHBOARD, '/cameras/list'),
    cameraApps: path(ROOTS_DASHBOARD, '/cameras/apps/:cameraId'),
    cameraAppSettings: path(ROOTS_DASHBOARD, '/cameras/apps/:cameraId/settings/:appId/:appCode'),
  },
  users: {
    root: path(ROOTS_DASHBOARD, '/users'),
    list: path(ROOTS_DASHBOARD, '/users/list'),
    new: path(ROOTS_DASHBOARD, '/users/new'),
    editById: path(ROOTS_DASHBOARD, '/users/edit/:userId'),
  },
  tenants: {
    root: path(ROOTS_DASHBOARD, '/tenants'),
    list: path(ROOTS_DASHBOARD, '/tenants/list'),
    new: path(ROOTS_DASHBOARD, '/tenants/new'),
    editById: path(ROOTS_DASHBOARD, '/tenants/edit/:tenantId'),
  },
  units: {
    root: path(ROOTS_DASHBOARD, '/units'),
    list: path(ROOTS_DASHBOARD, '/units/list'),
    new: path(ROOTS_DASHBOARD, '/units/new'),
    editById: path(ROOTS_DASHBOARD, '/units/edit/:unitId'),
  },
  agents: {
    root: path(ROOTS_DASHBOARD, '/agents'),
    list: path(ROOTS_DASHBOARD, '/agents/list'),
    new: path(ROOTS_DASHBOARD, '/agents/new'),
    editById: path(ROOTS_DASHBOARD, '/agents/edit/:agentId'),
  },
  alerts: {
    root: path(ROOTS_DASHBOARD, '/alerts'),
    getById: path(ROOTS_DASHBOARD, '/alerts/:id'),
  },
  recordings: {
    root: path(ROOTS_DASHBOARD, '/recordings'),
    list: path(ROOTS_DASHBOARD, '/recordings/list'),
    getById: path(ROOTS_DASHBOARD, '/recordings/:id'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
