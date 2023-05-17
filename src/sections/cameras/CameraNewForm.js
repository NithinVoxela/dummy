import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { format } from 'date-fns';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Chip, Box, Button, Card, Grid, Stack, TextField } from '@mui/material';
// utils

// components
import { FormProvider, RHFSelect, RHFTextField, RHFDateField, RHFCheckbox } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';

import { getAgentsForAutoComplete } from '../../redux/slices/agents';
import { SUPER_ADMIN_ROLE, EXTERNAL_SYSTEM_BLUEOCEAN } from '../common/CommonConstants';
import BlueOceanCameraConfig from './BlueOceanCameraConfig';
import { getExternalSystemConfig } from '../../api/externalSystemConfig';
import { hasExternalSystemIntegration } from '../../utils/commonUtil';

// ----------------------------------------------------------------------

CameraNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCamera: PropTypes.object,
  translate: PropTypes.func,
  handleSave: PropTypes.func,
  onCancel: PropTypes.func,
};

const cameraTypes = [{ label: 'IP Camera', value: 'IPCamera' }];

export default function CameraNewForm({ isEdit, currentCamera, translate, handleSave, onCancel }) {
  const [agentList, setAgentList] = useState([]);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(translate('app.camera-name-required-label')),
    description: Yup.string().required(translate('app.camera-desc-required-label')),
    cameraType: Yup.string().required(translate('app.camera-type-required-label')),
    brand: Yup.string().required(translate('app.camera-brand-required-label')),
    model: Yup.string().required(translate('app.camera-model-required-label')),
    streamUrl: Yup.string().required(translate('app.camera-stream-required-label')),
    streamingId: Yup.string().nullable(true).default(null),
    location: Yup.string().required(translate('app.camera-location-required-label')),
    installationDate: Yup.date().required('Installation Date is required'),
    passPhrase: Yup.string().required(translate('app.camera-pass-required-label')),
    minIdleTime: Yup.number()
      .min(1, translate('app.camera-min-idle-validation-label'))
      .max(9999999999, translate('app.camera-pass-required-label'))
      .required(translate('app.camera-min-idle-required-label')),
    agent: Yup.object().nullable(true).default(null),
  });

  const tomiliseconds = (hrs, min, sec) => (hrs * 60 * 60 + min * 60 + sec) * 1000;
  const { user } = useAuth();

  const [blueOceanCameraConfig, setBlueOceanCameraConfig] = useState(null);

  const defaultValues = useMemo(
    () => ({
      name: currentCamera?.name || '',
      description: currentCamera?.description || '',
      cameraType: currentCamera?.cameraType || '',
      brand: currentCamera?.brand || '',
      model: currentCamera?.model || '',
      streamUrl: currentCamera?.streamUrl || '',
      streamingId: currentCamera?.streamingId || '',
      installationDate: currentCamera?.installationDate || new Date(),
      location: currentCamera?.location || '',
      passPhrase: currentCamera?.passPhrase || '',
      publicId: currentCamera?.publicId || '',
      minIdleTime: currentCamera?.minIdleTime ? Math.floor(currentCamera?.minIdleTime / 60000) : 1440,
      enableIdleAlert: currentCamera?.enableIdleAlert || false,
      agent: currentCamera?.agent || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCamera]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const watchEnableIdleAlert = watch('enableIdleAlert', defaultValues?.enableIdleAlert);

  useEffect(() => {
    if (isEdit && currentCamera) {
      reset(defaultValues);
      blueOceanCameraConfigHandler();
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCamera]);

  const blueOceanCameraConfigHandler = async () => {
    if (
      user.role === SUPER_ADMIN_ROLE &&
      hasExternalSystemIntegration(user, EXTERNAL_SYSTEM_BLUEOCEAN) &&
      currentCamera?.publicId
    ) {
      const response = await getExternalSystemConfig(currentCamera?.publicId, 'CAMERA', EXTERNAL_SYSTEM_BLUEOCEAN);
      if (response?.data?.config) {
        setBlueOceanCameraConfig(response?.data?.config);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      data.installationDate = data.enableIdleAlert ? format(data.installationDate, "yyyy-MM-dd'T'HH:mm:ss") : null;
      data.minIdleTime = tomiliseconds(0, data.minIdleTime, 0);
      if (isEdit) {
        data = { ...currentCamera, ...data };
      }
      await handleSave(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const agentChangeHandler = async (searchStr) => {
    const response = await getAgentsForAutoComplete({ pageSize: 20 }, { name: searchStr });
    if (response?.data?.records) {
      setAgentList(response.data.records);
    }
  };

  const debounceAgentChangeHandler = useCallback(debounce(agentChangeHandler, 1000), []);

  const handleAgentChange = (value) => {
    if (value) {
      debounceAgentChangeHandler(value);
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
              <RHFTextField name="name" label={translate('app.camera-name-label')} />
              <RHFTextField name="description" label={translate('app.camera-desc-label')} />
              <RHFSelect
                name="cameraType"
                label={translate('app.camera-type-label')}
                placeholder={translate('app.camera-type-label')}
              >
                <option value="" />
                {cameraTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="brand" label={translate('app.camera-brand-label')} />
              <RHFTextField name="model" label={translate('app.camera-model-label')} />

              <RHFDateField name="installationDate" label={translate('app.camera-installation-label')} />
              <RHFTextField name="streamUrl" label={translate('app.camera-stream-label')} />

              <RHFTextField name="location" label={translate('app.camera-location-label')} />
              <RHFTextField name="passPhrase" label={translate('app.camera-pass-label')} />
              {isEdit && (
                <RHFTextField
                  name="publicId"
                  label={translate('app.camera-camera-id-label')}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              )}

              {user.role === SUPER_ADMIN_ROLE && isEdit && (
                <RHFTextField name="streamingId" disabled label={translate('app.camera-streaming-id-label')} />
              )}
              {user.role === SUPER_ADMIN_ROLE && (
                <Controller
                  name="agent"
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      {...field}
                      size="medium"
                      sx={{ minWidth: 300, ml: 1 }}
                      options={agentList || []}
                      onChange={(event, value) => field.onChange(value)}
                      filterOptions={(x) => x}
                      filterSelectedOptions
                      getOptionLabel={(option) => `${option.name}`}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onInputChange={(event, newInputValue) => {
                        handleAgentChange(newInputValue);
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={`agent-${option.id}`}
                            size="small"
                            label={`${option.name}`}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField label={translate('app.agent-label')} {...params} error={!!error} />
                      )}
                    />
                  )}
                />
              )}

              <RHFCheckbox name="enableIdleAlert" label={translate('app.camera-enable-idle-alert')} />
              {watchEnableIdleAlert && (
                <RHFTextField
                  name="minIdleTime"
                  label={translate('app.camera-min-idle-time')}
                  type="number"
                  pattern="[+-]?\d+(?:[.,]\d+)?"
                />
              )}
            </Box>

            {user.role === SUPER_ADMIN_ROLE && isEdit && blueOceanCameraConfig && (
              <BlueOceanCameraConfig translate={translate} blueOceanCameraConfig={blueOceanCameraConfig} />
            )}

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
