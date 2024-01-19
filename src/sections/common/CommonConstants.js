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

export const PERSON_APP_CODE = 'A001';
export const WAKEUP_APP_CODE = 'A003';
export const FALL_APP_CODE = 'A004';
export const RECORDING_APP_CODE = 'A005';
export const STREAMING_APP_CODE = 'A006';
export const REGION_EXIT_APP_CODE = 'A007';
