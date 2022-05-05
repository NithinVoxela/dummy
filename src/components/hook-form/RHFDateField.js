import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// @mui
import { TextField } from '@mui/material';
import { useState } from 'react';
import { format } from 'date-fns';

// ----------------------------------------------------------------------

RHFDateField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string, 
};

export default function RHFDateField({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DesktopDatePicker
            label={label}
            inputFormat="do MMM yyyy"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField fullWidth error={!!error} helperText={error?.message} {...other} {...params} />}
          />          
        )}
      />
    </LocalizationProvider>
  );
}
