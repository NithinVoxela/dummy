import PropTypes from 'prop-types';
// form
// @mui
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
// @types
import { useEffect, useMemo, useState } from 'react';
import { NAVBAR } from '../../config';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { RHFRadioGroup, RHFSelect } from '../../components/hook-form';

const EVENT_TYPES = ['motion', 'fall', 'person', 'wakeup'];

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
  sortDirection: PropTypes.bool,
  locale: PropTypes.string,
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
  sortDirection,
  locale,
  currentTab,
}) {
  const allOptionLabel = translate('app.all-option-label');
  const SEVERITY = [
    { value: allOptionLabel, label: allOptionLabel },
    { value: 'High', label: translate('app.alert-high-label') },
    { value: 'Medium', label: translate('app.alert-medium-label') },
    { value: 'Low', label: translate('app.alert-low-label') },
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cameraText, setCameraText] = useState(allOptionLabel);
  const [severityValue, setSeverityValue] = useState(allOptionLabel);
  const [eventText, setEventText] = useState(allOptionLabel);
  const [showUnread, setShowUnread] = useState(false);

  const eventTypes = useMemo(() => {
    const events = [{ id: allOptionLabel, label: allOptionLabel }];
    const result = EVENT_TYPES.map((item) => ({ id: item, label: translate(`app.app-name-${item.toLowerCase()}`) }));
    return events.concat(result);
  }, [isOpen]);

  const cameraDataList = useMemo(() => {
    const cameras = [{ id: allOptionLabel, name: allOptionLabel }];
    let result = [];
    if (cameraList.length > 0) {
      result = cameraList.map((item) => ({ publicId: item.publicId, name: item.name }));
    }
    return cameras.concat(result);
  }, [cameraList]);

  const handleCameraChange = (e) => {
    const filteredValue = e.target.value;
    const newParams = { ...params };
    setCameraText(filteredValue);
    if (filteredValue?.length > 0 && filteredValue !== allOptionLabel) {
      newParams.cameraName = filteredValue;
    } else {
      delete newParams.cameraName;
    }
    applyFilter(newParams);
  };

  const handleEventTypeChange = (e) => {
    const filteredValue = e.target.value;
    const newParams = { ...params };
    setEventText(filteredValue);
    if (filteredValue?.length > 0 && filteredValue !== allOptionLabel) {
      newParams.eventType = eventTypes.find((item) => item.label === filteredValue)?.id;
    } else {
      delete newParams.eventType;
    }
    applyFilter(newParams);
  };

  const handleRadioChange = (e, value) => {
    const newParams = { ...params };
    if (value?.length > 0 && value !== allOptionLabel) {
      const filteredValue = SEVERITY.find((item) => item.label === value);
      newParams.severity = filteredValue?.value;
      setSeverityValue(value);
    } else {
      delete newParams.severity;
    }
    applyFilter(newParams);
  };

  const resetFilter = () => {
    setCameraText(allOptionLabel);
    setSeverityValue(allOptionLabel);
    setStartDate(null);
    setEndDate(null);
    setEventText(allOptionLabel);
    setShowUnread(false);
    applyFilter({});
  };

  const handleStartDate = (value) => {
    if (value) {
      value.set({ second: 0, millisecond: 0 });
    }

    if ((!value && !startDate) || (value && startDate && startDate.isSame(value))) {
      return;
    }

    setStartDate(value);
    if (!value || (value.isValid() && !(endDate && value.isAfter(endDate)))) {
      const newParams = { ...params };
      newParams.startDate = value;
      if (endDate) {
        newParams.endDate = endDate;
      }
      applyFilter(newParams);
    }
  };

  const handleEndDate = (value) => {
    if (value) {
      value.set({ second: 0, millisecond: 0 });
    }

    if ((!value && !endDate) || (value && endDate && endDate.isSame(value))) {
      return;
    }

    setEndDate(value);

    if (!value || (value.isValid() && !(startDate && value.isBefore(startDate)))) {
      const newParams = { ...params };
      newParams.endDate = value;
      if (startDate) {
        newParams.startDate = startDate;
      }
      applyFilter(newParams);
    }
  };

  const handleDeskAlertChange = (event) => {
    const isChecked = event.target.checked;
    setShowUnread(isChecked);

    const newParams = { ...params, hasRead: !isChecked };
    applyFilter(newParams);
  };

  const applyFilter = (newParams) => {
    setParams({ ...newParams });
    setClearData(true);
    getAlertData(0, sortDirection, newParams);
  };

  useEffect(() => {
    setCameraText(allOptionLabel);
    setEventText(allOptionLabel);
    setSeverityValue(allOptionLabel);
    setStartDate(null);
    setEndDate(null);
    setShowUnread(false);

    if (params?.cameraName) {
      setCameraText(params.cameraName);
    }
    if (params?.severity) {
      const filteredValue = SEVERITY.find((item) => item.value === params.severity);
      setSeverityValue(filteredValue.label);
    }
    if (params?.startDate) {
      setStartDate(params.startDate);
    }
    if (params?.endDate) {
      setEndDate(params.endDate);
    }
    if (params?.eventType) {
      const type = eventTypes.find((item) => item.id === params.eventType);
      setEventText(type?.label);
    }
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty('hasRead') && params.hasRead === false) {
      setShowUnread(true);
    }
  }, [params]);

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentUtils} adapterLocale={locale}>
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
                {cameraDataList.map((option) => (
                  <option key={option.publicId} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.event-type-label')}</Typography>
              <RHFSelect name="eventType" label="" size="small" onChange={handleEventTypeChange} value={eventText}>
                <option value="" />
                {eventTypes.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
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
              <DesktopDateTimePicker
                inputFormat="DD MMMM yyyy hh:mm a"
                value={startDate}
                onChange={handleStartDate}
                minDate={currentTab !== 'archive' ? moment().subtract(1, 'month') : null}
                disableFuture
                size="small"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    inputProps={{ ...params.inputProps, placeholder: translate('app.select-date-label') }}
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.end-date-lable')}</Typography>
              <DesktopDateTimePicker
                inputFormat="DD MMMM yyyy hh:mm a"
                value={endDate}
                onChange={handleEndDate}
                minDate={currentTab !== 'archive' ? moment().subtract(1, 'month') : null}
                disableFuture
                size="small"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    inputProps={{ ...params.inputProps, placeholder: translate('app.select-date-label') }}
                  />
                )}
              />
              {startDate && endDate && endDate.isBefore(startDate) && (
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="error">{translate('app.start-time-error-lable')}</Typography>
                </Box>
              )}
            </Stack>
            <Stack spacing={1}>
              <FormControlLabel
                control={<Checkbox checked={showUnread} onChange={handleDeskAlertChange} name="unread" />}
                label={translate('app.show-only-unread-label')}
              />
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
