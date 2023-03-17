import { Typography } from '@mui/material';
import Label from '../../components/Label';

export const USERS_TABLE_META = {
  size: 'medium',
  idProperty: 'id',
  columns: [
    {
      text: 'app.users-firstName-label',
      dataKey: 'firstName',
    },
    {
      text: 'app.users-lastName-label',
      dataKey: 'lastName',
    },
    {
      text: 'app.username-label',
      dataKey: 'userName',
      type: 'widget',
      sortable: true,
      renderWidget: (col, cellData, value) => <Typography variant="subtitle2">{value}</Typography>,
    },
    {
      text: 'app.role-label',
      dataKey: 'role',
      type: 'widget',
      renderWidget: (col, cellData, value, translate) => <Typography>{translate(`app.${value}`)}</Typography>,
    },
    {
      text: 'app.users-email-label',
      dataKey: 'email',
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
      text: 'app.users-mobile-registered-label',
      dataKey: 'isMobileRegistered',
      type: 'widget',
      renderWidget: (col, cellData, value, translate) => (
        <>
          {value ? (
            <Label variant="ghost" color="success">
              {'✓'}
            </Label>
          ) : (
            <Label variant="ghost" color="error">
              {'✗'}
            </Label>
          )}
        </>
      ),
    },
    {
      text: 'app.users-web-registered-label',
      dataKey: 'isWebRegistered',
      type: 'widget',
      renderWidget: (col, cellData, value, translate) => (
        <>
          {value ? (
            <Label variant="ghost" color="success">
              {'✓'}
            </Label>
          ) : (
            <Label variant="ghost" color="error">
              {'✗'}
            </Label>
          )}
        </>
      ),
    },
    {
      text: '',
      dataKey: 'action',
    },
  ],
};
