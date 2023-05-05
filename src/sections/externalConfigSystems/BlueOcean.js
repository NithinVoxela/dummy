import { Box, Card, TextField } from '@mui/material';

export default function BlueOcean({ translate, handleExternalConfigSubmit, externalConfigForm }) {
  return (
    <Card
      sx={{
        p: 3,
        maxWidth: 660,
      }}
    >
      <Box
        sx={{
          maxWidth: 640,
          display: 'grid',
          columnGap: 2,
          rowGap: 2,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        <TextField
          size="small"
          sx={{ maxWidth: 300 }}
          value={externalConfigForm.corporationCd}
          onChange={handleExternalConfigSubmit}
          name="corporationCd"
          label={translate('app.tenant-external-system-corporation-code')}
        />
        <TextField
          size="small"
          sx={{ maxWidth: 300 }}
          value={externalConfigForm.jigCode}
          onChange={handleExternalConfigSubmit}
          name="jigCode"
          label={translate('app.tenant-external-system-jig-code')}
        />
        <TextField
          size="small"
          sx={{ maxWidth: 300 }}
          value={externalConfigForm.authAccessKey}
          onChange={handleExternalConfigSubmit}
          name="authAccessKey"
          label={translate('app.tenant-external-system-auth-access-key')}
        />
        <TextField
          size="small"
          sx={{ maxWidth: 300 }}
          value={externalConfigForm.formatKbn}
          onChange={handleExternalConfigSubmit}
          name="formatKbn"
          label={translate('app.tenant-external-system-format-kbn')}
        />
      </Box>
    </Card>
  );
}
