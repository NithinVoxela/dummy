import { Autocomplete, Chip, TextField, FormControlLabel } from '@mui/material';

export const renderExternalSystemsAutoComplete = (handler, value, type, translate, externalSystemsList) => (
  <FormControlLabel
    control={
      <Autocomplete
        multiple
        size="small"
        sx={{ minWidth: 300, ml: 1 }}
        onChange={handler}
        options={externalSystemsList || []}
        getOptionLabel={(option) => `${option}`}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip {...getTagProps({ index })} key={`${type}-${option}`} size="small" label={`${option}`} />
          ))
        }
        renderInput={(params) => (
          <TextField
            label={translate('app.tenant-external-system-subscribers-label')}
            {...params}
            error={value.length === 0}
            helperText={value.length === 0 ? translate('app.subscriber-validation-label') : ''}
          />
        )}
        value={value}
      />
    }
    labelPlacement="start"
    sx={{ mb: 2, justifyContent: 'start' }}
  />
);
