import { formatEpochTime } from '../../utils/formatTime';

export const UNIT_TABLE_META = {
  size: 'medium',
  idProperty: 'id',
  columns: [
    {
      text: 'app.name-label',
      dataKey: 'name',
      sortable: true,
    },
    {
      text: 'app.created-label',
      dataKey: 'createdAt',
      sortable: false,
      type: 'widget',
      renderWidget: (col, cellData, value, translate, authContext) => (
        <>{value && value > 0 ? formatEpochTime(value, authContext?.user?.timezone) : ''}</>
      ),
    },
    {
      text: '',
      dataKey: 'action',
    },
  ],
};
