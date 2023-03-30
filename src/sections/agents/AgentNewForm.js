import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { debounce } from 'lodash';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Card, Chip, Grid, Stack, TextField } from '@mui/material';

// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
import { registrationStatuses } from '../common/CommonConstants';

import { getCamerasForAutoComplete } from '../../redux/slices/cameras';

// ----------------------------------------------------------------------

AgentNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentAgent: PropTypes.object,
  translate: PropTypes.func,
  handleSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function AgentNewForm({ isEdit, currentAgent, translate, handleSave, onCancel }) {
  const [cameraList, setCameraList] = useState([]);
  const newAgentSchema = Yup.object().shape({
    name: Yup.string().required(translate('app.name-required-label')),
    registrationStatus: Yup.string().nullable(true).default(null),
    publicId: Yup.string().nullable(true).default(null),
    ipAddress: Yup.string().nullable(true).default(null),
    cameras: Yup.array().nullable(true).default([]),
    macIds: Yup.array().nullable(true).default([]),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentAgent?.name || '',
      registrationStatus: currentAgent?.registrationStatus || undefined,
      ipAddress: currentAgent?.ipAddress || '',
      publicId: currentAgent?.publicId || '',
      cameras: currentAgent?.cameras || [],
      macIds: currentAgent?.macIds || [],
    }),
    [currentAgent]
  );

  const methods = useForm({
    resolver: yupResolver(newAgentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit, currentAgent]);

  const onSubmit = async (data) => {
    if (isEdit) {
      data = { ...currentAgent, ...data };
    }

    await handleSave(data);
  };

  const cameraChangeHandlerHandler = async (searchStr) => {
    const response = await getCamerasForAutoComplete({ pageSize: 20 }, { name: searchStr });
    if (response?.data?.records) {
      setCameraList(response.data.records);
    }
  };

  const debounceCameraChangeHandler = useCallback(debounce(cameraChangeHandlerHandler, 1000), []);

  const handleCameraChange = (value) => {
    if (value) {
      debounceCameraChangeHandler(value);
    }
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
              <RHFTextField name="name" label={translate('app.name-label')} />

              {isEdit && <RHFTextField name="publicId" label={translate('app.agent-public-id-label')} disabled />}

              {isEdit && (
                <RHFSelect
                  name="registrationStatus"
                  label={translate('app.agent-registration-status-label')}
                  placeholder={translate('app.agent-registration-status-label')}
                >
                  {registrationStatuses.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>
              )}

              {isEdit && <RHFTextField name="ipAddress" label={translate('app.agent-ipAddress-label')} />}

              <Controller
                name="cameras"
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    size="medium"
                    sx={{ minWidth: 300, ml: 1 }}
                    options={cameraList || []}
                    onChange={(event, value) => field.onChange(value)}
                    filterOptions={(x) => x}
                    filterSelectedOptions
                    getOptionLabel={(option) => `${option.name}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onInputChange={(event, newInputValue) => {
                      handleCameraChange(newInputValue);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={`cameras-${option.id}`}
                          size="small"
                          label={`${option.name}`}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField label={translate('app.cameras-label')} {...params} error={!!error} />
                    )}
                  />
                )}
              />

              <Controller
                name="macIds"
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    size="medium"
                    sx={{ minWidth: 300, ml: 1 }}
                    options={[]}
                    onChange={(event, value) => field.onChange(value)}
                    filterOptions={(x) => x}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={`macIds-${option}`} size="small" label={`${option}`} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField label={translate('app.agent-macIds-label')} {...params} error={!!error} />
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
