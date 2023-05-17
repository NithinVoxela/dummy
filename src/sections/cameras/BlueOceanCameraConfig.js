import { Box, Card, Typography } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { EXTERNAL_SYSTEM_BLUEOCEAN } from '../common/CommonConstants';

export default function BlueOceanCameraConfig({ translate, blueOceanCameraConfig }) {
  return (
    <Card
      sx={{
        p: 3,
        maxWidth: 660,
      }}
    >
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6">{EXTERNAL_SYSTEM_BLUEOCEAN}</Typography>
      </Box>
      <Box
        sx={{
          maxWidth: 640,
          display: 'grid',
          columnGap: 2,
          rowGap: 2,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        <RHFTextField
          name="boUnitCd"
          disabled
          value={blueOceanCameraConfig.unitCd}
          label={translate('app.camera-bo-external-system-unit-code')}
        />
        <RHFTextField
          name="boResCd"
          disabled
          value={blueOceanCameraConfig.resCode}
          label={translate('app.camera-bo-external-system-res-code')}
        />
      </Box>
    </Card>
  );
}
