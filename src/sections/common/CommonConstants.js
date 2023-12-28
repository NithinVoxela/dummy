export const SUPER_ADMIN_ROLE = 'SUPER_ADMIN';
export const ADMIN_ROLES = ['ADMIN', 'ORG_ADMIN', SUPER_ADMIN_ROLE];
export const MULTIPLE_TENANT_ACCESS_ROLES = ['ORG_ADMIN', SUPER_ADMIN_ROLE];
export const regions = [{ label: 'ap-northeast-1', value: 'ap-northeast-1' }];
export const registrationStatuses = [
  { label: 'CREATED', value: 'CREATED' },
  { label: 'REGISTRATION_INITIATED', value: 'REGISTRATION_INITIATED' },
  { label: 'REGISTRATION_COMPLETE', value: 'REGISTRATION_COMPLETE' },
];
export const EXTERNAL_SYSTEM_BLUEOCEAN = 'BlueOcean';
export const externalSystemsList = [EXTERNAL_SYSTEM_BLUEOCEAN];
export const CAMERA_LOCATIONS = ['ROOM', 'HALLWAY', 'DINING', 'UNKNOWN'];
export const CAMERA_BRANDS = ['QWATCH', 'AXIS', 'AXIS_AGENT', 'UNKNOWN'];
