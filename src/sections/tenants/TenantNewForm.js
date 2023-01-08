import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Card, Chip, Grid, Stack, TextField } from '@mui/material';

import useAuth from '../../hooks/useAuth';

// redux
import { getTenantsForAutoComplete } from '../../redux/slices/tenants';

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
  const [parents, setParents] = useState([]);
  const { user } = useAuth();
  const newTenantSchema = Yup.object().shape({
    tenantName: Yup.string().required(translate('app.name-required-label')),
    tenantCode: Yup.string().required(translate('app.code-required-label')),
    region: Yup.string().required(translate('app.region-required-label')),
    apiAuthKey: Yup.string().nullable(true).default(null),
    parent: Yup.object().nullable(true).default(null),
  });

  const defaultValues = useMemo(
    () => ({
      tenantName: currentTenant?.tenantName || '',
      tenantCode: currentTenant?.tenantCode || '',
      region: currentTenant?.region || '',
      parent: currentTenant?.parent || null,
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

    if (data?.apiAuthKey) {
      data.apiAuthKey = Buffer.from(data.apiAuthKey, 'utf8').toString('base64');
    }

    await handleSave(data);
  };

  const searchHandler = async (searchStr) => {
    const response = await getTenantsForAutoComplete({ pageSize: 20 }, { tenantName: searchStr });
    if (response?.data?.records) {
      setParents(response.data.records);
    }
  };

  const debounceSearchHandler = useCallback(debounce(searchHandler, 1000), []);

  const handleNameChange = (value) => {
    debounceSearchHandler(value);
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

              <RHFTextField
                name="apiAuthKey"
                onFocus={isEdit ? (e) => (e.target.value = '') : () => {}}
                onBlur={isEdit ? (e) => (e.target.value = '••••••••') : () => {}}
                label={translate('app.apiAuthKey-label')}
                defaultValue={isEdit ? '••••••••' : null}
              />

              <Controller
                name="parent"
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    disabled={user?.role !== 'SUPER_ADMIN'}
                    size="small"
                    sx={{ minWidth: 300, ml: 1 }}
                    options={parents || []}
                    onChange={(event, value) => field.onChange(value)}
                    filterOptions={(x) => x}
                    getOptionLabel={(option) => `${option.tenantName}`}
                    onInputChange={(event, newInputValue) => {
                      handleNameChange(newInputValue);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={`parent-${option.id}`}
                          size="small"
                          label={`${option.tenantName}`}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField label={translate('app.tenant-parent-label')} {...params} error={!!error} />
                    )}
                  />
                )}
              />
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
