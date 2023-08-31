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
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { getCamerasForAutoComplete } from '../../redux/slices/cameras';
import { getUsersForAutoComplete } from '../../redux/slices/users';
// ----------------------------------------------------------------------

UnitNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUnit: PropTypes.object,
  translate: PropTypes.func,
  handleSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function UnitNewForm({ isEdit, currentUnit, translate, handleSave, onCancel }) {
  const [cameraList, setCameraList] = useState([]);
  const [userList, setUserList] = useState([]);
  const newUnitSchema = Yup.object().shape({
    name: Yup.string().required(translate('app.name-required-label')),
    cameras: Yup.array().nullable(true).default([]),
    users: Yup.array().nullable(true).default([]),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUnit?.name || '',
      cameras: currentUnit?.cameras || [],
      users: currentUnit?.users || [],
    }),
    [currentUnit]
  );

  const methods = useForm({
    resolver: yupResolver(newUnitSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit, currentUnit]);

  const onSubmit = async (data) => {
    if (isEdit) {
      data = { ...currentUnit, ...data };
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

  const userChangeHandlerHandler = async (searchStr) => {
    const response = await getUsersForAutoComplete({ pageSize: 20 }, { userName: searchStr });
    if (response?.data?.records) {
      setUserList(response.data.records);
    }
  };

  const debounceUserChangeHandler = useCallback(debounce(userChangeHandlerHandler, 1000), []);

  const handleUserChange = (value) => {
    if (value) {
      debounceUserChangeHandler(value);
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
                    isOptionEqualToValue={(option, value) => option.publicId === value.publicId}
                    onInputChange={(event, newInputValue) => {
                      handleCameraChange(newInputValue);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={`cameras-${option.publicId}`}
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
                name="users"
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    size="medium"
                    sx={{ minWidth: 300, ml: 1 }}
                    options={userList || []}
                    onChange={(event, value) => field.onChange(value)}
                    filterOptions={(x) => x}
                    filterSelectedOptions
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onInputChange={(event, newInputValue) => {
                      handleUserChange(newInputValue);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={`users-${option.id}`}
                          size="small"
                          label={`${option.firstName} ${option.lastName}`}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField label={translate('app.users-label')} {...params} error={!!error} />
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
