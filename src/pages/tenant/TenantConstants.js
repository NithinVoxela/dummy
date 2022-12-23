export const TENANT_TABLE_META = {
  size: 'medium',
  idProperty: 'id',
  columns: [
    {
      text: 'app.name-label',
      dataKey: 'tenantName',
      sortable: true,
    },
    {
      text: 'app.code-label',
      dataKey: 'tenantCode',
      sortable: true,
    },
    {
      text: 'app.region-label',
      dataKey: 'region',
      sortable: false,
    },
    {
      text: '',
      dataKey: 'action',
    },
  ],
};
