import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
// utils

// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
import { regions } from '../common/CommonConstants';

// ----------------------------------------------------------------------

TenantNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTenant: PropTypes.object,
  translate: PropTypes.func,
  handleSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function TenantNewForm({ isEdit, currentTenant, translate, handleSave, onCancel }) {
  const newTenantSchema = Yup.object().shape({
    tenantName: Yup.string().required(translate('app.name-required-label')),
    tenantCode: Yup.string().required(translate('app.code-required-label')),
    region: Yup.string().required(translate('app.region-required-label')),
  });

  const defaultValues = useMemo(
    () => ({
      tenantName: currentTenant?.tenantName || '',
      tenantCode: currentTenant?.tenantCode || '',
      region: currentTenant?.region || '',
    }),
    [currentTenant]
  );

  const methods = useForm({
    resolver: yupResolver(newTenantSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit, currentTenant]);

  const onSubmit = async (data) => {
    if (isEdit) {
      data = { ...currentTenant, ...data };
    }
    await handleSave(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="tenantName" label={translate('app.name-label')} />
              <RHFTextField name="tenantCode" label={translate('app.code-label')} disabled={isEdit} />

              <RHFSelect
                name="region"
                label={translate('app.region-label')}
                disabled={isEdit}
                placeholder={translate('app.region-label')}
              >
                <option value="" />
                {regions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex' }}>
                <Button onClick={onCancel} sx={{ mr: 1 }}>
                  {translate('app.camera-cancel-label')}
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {translate('app.camera-save-label')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
