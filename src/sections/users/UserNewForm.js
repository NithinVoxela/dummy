import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
// moment
import moment from 'moment-timezone';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUsers: PropTypes.object,
  translate: PropTypes.func,
  handleSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function UserNewForm({ isEdit, currentUsers, translate, handleSave, onCancel }) {
  const NewUserSchema = Yup.object().shape({
    userName: Yup.string().required(translate('app.username-required-label')),
    userPassword: isEdit
      ? Yup.string().when({
          is: (exists) => !!exists,
          then: Yup.string().nullable(true).default(null).min(6, translate('app.users-min-password-label')),
          otherwise: Yup.string().nullable(true).default(null),
        })
      : Yup.string()
          .min(6, translate('app.users-min-password-label'))
          .required(translate('app.password-required-label')),
    firstName: Yup.string().required(translate('app.firstname-required-label')),
    lastName: Yup.string().required(translate('app.lastname-required-label')),
    email: Yup.string(),
    mobileNo: Yup.string(),
    locale: Yup.string().required(translate('app.locale-required-label')),
    timezone: Yup.string().required(translate('app.timezone-required-label')),
    role: Yup.string().required(translate('app.role-required-label')),
    dateFormat: Yup.string().required(translate('app.dateFormat-required-label')),
  });

  const defaultValues = useMemo(
    () => ({
      userName: currentUsers?.userName || '',
      userPassword: null,
      firstName: currentUsers?.firstName || '',
      lastName: currentUsers?.lastName || '',
      email: currentUsers?.email || '',
      mobileNo: currentUsers?.mobileNo || '',
      locale: currentUsers?.locale || '',
      timezone: currentUsers?.timezone || '',
      role: currentUsers?.role || '',
      dateFormat: currentUsers?.dateFormat || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUsers]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUsers) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUsers]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        data = { ...currentUsers, ...data };
      }
      if (data?.userPassword) {
        data.userPassword = Buffer.from(data.userPassword, 'utf8').toString('base64');
      } else {
        data.userPassword = null;
      }
      await handleSave(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const localeTypes = [
    { label: translate('app.lang-en'), value: 'en' },
    { label: translate('app.lang-ja'), value: 'ja' },
  ];
  const timeZoneTypes = moment.tz.names();
  const roleTypes = [
    { label: translate('app.role-user'), value: 'USER' },
    { label: translate('app.site-admin'), value: 'ADMIN' },
  ];
  const dateFormatTypes = [{ label: 'yyyy/MM/dd hh:mm a', value: 'yyyy/MM/dd hh:mm a' }];

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
              <RHFTextField name="userName" label={translate('app.username-label')} />
              <RHFTextField
                name="userPassword"
                onFocus={isEdit ? (e) => (e.target.value = '') : () => {}}
                onBlur={isEdit ? (e) => (e.target.value = '••••••••') : () => {}}
                label={translate('app.password-label')}
                defaultValue={isEdit ? '••••••••' : null}
              />
              <RHFTextField name="firstName" label={translate('app.users-firstName-label')} />
              <RHFTextField name="lastName" label={translate('app.users-lastName-label')} />
              <RHFTextField name="email" label={translate('app.users-email-label')} />
              <RHFTextField name="mobileNo" label={translate('app.users-mobileNo-label')} />
              <RHFSelect
                name="locale"
                label={translate('app.locale-label')}
                placeholder={translate('app.locale-label')}
              >
                <option value="" />
                {localeTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="timezone"
                label={translate('app.users-timeZone-label')}
                placeholder={translate('app.users-timeZone-label')}
              >
                <option value="" />
                {timeZoneTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="role" label={translate('app.role-label')} placeholder={translate('app.role-label')}>
                <option value="" />
                {roleTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="dateFormat"
                label={translate('app.date-format-label')}
                placeholder={translate('app.date-format-label')}
              >
                <option value="" />
                {dateFormatTypes.map((option) => (
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
