import { Box, Typography } from '@mui/material';

export const USERS_TABLE_META = {
  size: 'medium',
  idProperty: 'id',
  columns: [
    {
      text: 'app.username-label',
      dataKey: 'userName',
      type: 'widget',
      sortable: true,
      renderWidget: (col, cellData, value) => <Typography variant="subtitle2">{value}</Typography>,
    },
    {
      text: 'app.users-email-label',
      dataKey: 'email',
    },
    {
      text: 'app.users-firstName-label',
      dataKey: 'firstName',
    },
    {
      text: 'app.users-lastName-label',
      dataKey: 'lastName',
    },
    {
      text: 'app.users-timeZone-label',
      dataKey: 'timezone',
    },
    {
      text: 'app.users-mobileNo-label',
      dataKey: 'mobileNo',
    },
    {
      text: '',
      dataKey: 'action',
    },
  ],
};