import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useLocales from '../../../hooks/useLocales';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();
  const { translate } = useLocales();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    email: '',
    password: '',
    remember: true,
  });


  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(translate('app.username-required-label')),
    password: Yup.string().required(translate('app.password-required-label')),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      localStorage.setItem('loginData', JSON.stringify(data));     
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  useEffect(() => {
    const loginData = localStorage.getItem('loginData'); 
    if (loginData) {
      try {
        const data = JSON.parse(loginData);
        if (data.remember) {
          setDefaultValues({
            email: data.email,
            password: data.password,
            remember: true
          });
          setValue('email', data.email);
          setValue('password', data.password);
          setValue('remember', data.remember);
        }
      } catch (err) {
        console.log(err);
      }
    }    
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message || translate('app.invalid-credentials')}</Alert>}

        <RHFTextField name="email" label={translate('app.username-label')} />

        <RHFTextField
          name="password"
          label={translate('app.password-label')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label={translate('app.remember-me-label')} />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        {translate('app.login-header-label')}
      </LoadingButton>
    </FormProvider>
  );
}
