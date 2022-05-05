import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Drawer, Divider, IconButton, Typography, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, isAfter, isValid } from 'date-fns';
// @types
import { useEffect, useState } from 'react';
import { NAVBAR } from '../../config';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { RHFRadioGroup, RHFSelect } from '../../components/hook-form';

AlertFilterSidebar.propTypes = {
  isOpen: PropTypes.bool,
  onResetAll: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  translate: PropTypes.func,
  cameraList: PropTypes.array,
  getAlertData: PropTypes.func,
  setParams: PropTypes.func,
  params: PropTypes.object,
  setClearData: PropTypes.func,
};

export default function AlertFilterSidebar({
  isOpen,
  onOpen,
  onClose,
  translate,
  cameraList,
  getAlertData,
  params,
  setParams,
  setClearData,
}) {
  const SEVERITY = [
    { value: 'High', label: translate('app.alert-high-label') },
    { value: 'Medium', label: translate('app.alert-medium-label') },
    { value: 'Low', label: translate('app.alert-low-label') },
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cameraText, setCameraText] = useState("");
  const [severityValue, setSeverityValue] = useState(null);

  const handleCameraChange = (e) => {
    const filteredValue = e.target.value;
    const newParams = { ...params };
    if (filteredValue?.length > 0) {
      newParams.cameraName = filteredValue;  
      setCameraText(filteredValue);    
    } else {
      delete newParams.cameraName;
    }
    applyFilter(newParams);
  };

  const handleRadioChange = (e, value) => {
    const newParams = { ...params };
    if (value?.length > 0) {
      const filteredValue = SEVERITY.find((item) => item.label === value);
      newParams.severity = filteredValue?.value;
      setSeverityValue(value);
    } else {
      delete newParams.severity;
    }
    applyFilter(newParams);
  };

  const resetFilter = () => {
    setCameraText("");
    setSeverityValue(null);
    setStartDate(null);
    setEndDate(null);
    applyFilter({});
  };

  const handleStartDate = (value) => {
    const newParams = { ...params };
    if (value && isValid(value)) {
      setStartDate(value);
      newParams.startDate = format(value, 'yyyy-MM-dd');
    } else {
      delete newParams.startDate;
    }

    if (value && isValid(value) && endDate && isAfter(value, endDate)) {
      return;
    }

    applyFilter(newParams);
  };

  const handleEndDate = (value) => {
    const newParams = { ...params };
    if (value && isValid(value)) {
      setEndDate(value);
      newParams.endDate = format(value, 'yyyy-MM-dd');
    } else {
      delete newParams.endDate;
    }

    if (value && isValid(value) && startDate && isAfter(startDate, value)) {
      return;
    }

    applyFilter(newParams);
  };

  const applyFilter = (newParams) => {
    setParams(newParams);
    setClearData(true);
    getAlertData(0, false, newParams);
  };

  useEffect(() => {
    setCameraText("");
    setSeverityValue(null);
    setStartDate(null);
    setEndDate(null);

    if (params?.cameraName) {
      setCameraText(params.cameraName);
    }
    if (params?.severity) {
      const filteredValue = SEVERITY.find((item) => item.value === params.severity);      
      setSeverityValue(filteredValue.label);      
    } 
    if (params?.startDate) {
      setStartDate(new Date(params.startDate));
    } 
    if (params?.endDate) {
      setEndDate(new Date(params.endDate));
    }
  }, [params]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Button disableRipple color="inherit" endIcon={<Iconify icon={'ic:round-filter-list'} />} onClick={onOpen}>
        {translate('app.filter-label')}
      </Button>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: { width: NAVBAR.BASE_WIDTH },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {translate('app.filter-label')}
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.cameras-header-label')}</Typography>
              <RHFSelect
                name="camera"
                label=""
                placeholder={translate('app.alert-camera-details')}
                size="small"
                onChange={handleCameraChange}
                value={cameraText}
              >
                <option value="" />
                {cameraList.map((option) => (
                  <option key={option.publicId} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.alerts-severity-label')}</Typography>
              <RHFRadioGroup
                name="severity"
                options={SEVERITY.map((item) => item.label)}
                row={false}
                onChange={handleRadioChange}
                value={severityValue}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.start-date-lable')}</Typography>
              <DesktopDatePicker
                inputFormat="dd MMMM yyyy"
                value={startDate}
                onChange={handleStartDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    inputProps={{ 
                      ...params.inputsProps, 
                      placeholder: translate('app.select-date-label') 
                    }}
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.end-date-lable')}</Typography>
              <DesktopDatePicker
                inputFormat="dd MMMM yyyy"
                placeholder={translate('app.select-date-label')}
                value={endDate}
                onChange={handleEndDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    inputProps={{ 
                      ...params.inputsProps, 
                      placeholder: translate('app.select-date-label') 
                    }}
                  />
                )}
              />
              {endDate && isValid(endDate) && startDate && isValid(startDate) && isAfter(startDate, endDate) && (
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="error">{translate('app.start-time-error-lable')}</Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<Iconify icon={'ic:round-clear-all'} />}
          >
            {translate('app.filter-reset-label')}
          </Button>
        </Box>
      </Drawer>
    </LocalizationProvider>
  );
}
