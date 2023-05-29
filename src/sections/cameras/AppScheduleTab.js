import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { format, set, isEqual, isWithinInterval } from 'date-fns';
import { cloneDeep } from 'lodash';
// @mui
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  MenuItem,
} from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
import TimePickerCmp from './TimePickerCmp';
import { CheckboxCheckedIcon } from '../../theme/overrides/CustomIcons';
// ----------------------------------------------------------------------

AppScheduleTab.propTypes = {
  translate: PropTypes.func,
  appId: PropTypes.string,
  schedularList: PropTypes.array,
  updateAppScheduleRequest: PropTypes.func,
  resetSchedule: PropTypes.func,
  onCancel: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function AppScheduleTab(props) {
  const { translate, appId, updateAppScheduleRequest, schedularList, resetSchedule, onCancel, setIsFormUpdated } =
    props;

  const dayLabels = [
    translate('app.weekday-monday-label'),
    translate('app.weekday-tuesday-label'),
    translate('app.weekday-wednesday-label'),
    translate('app.weekday-thursday-label'),
    translate('app.weekday-friday-label'),
    translate('app.weekday-saturday-label'),
    translate('app.weekday-sunday-label'),
  ];
  const weekdays = [
    {
      label: translate('app.weekday-mon-label'),
      isSelected: false,
      hasError: false,
      schedule: [],
    },
    {
      label: translate('app.weekday-tue-label'),
      isSelected: false,
      hasError: false,
      schedule: [],
    },
    {
      label: translate('app.weekday-wed-label'),
      isSelected: false,
      hasError: false,
      schedule: [],
    },
    {
      label: translate('app.weekday-thu-label'),
      isSelected: false,
      hasError: false,
      schedule: [],
    },
    {
      label: translate('app.weekday-fri-label'),
      isSelected: false,
      hasError: false,
      schedule: [],
    },
    {
      label: translate('app.weekday-sat-label'),
      isSelected: false,
      hasError: false,
      schedule: [],
    },
    {
      label: translate('app.weekday-sun-label'),
      isSelected: false,
      hasError: false,
      schedule: [],
    },
  ];
  const [scheduleData, setScheduleData] = useState(weekdays);
  const [hasTimeUpdated, setHasTimeUpdated] = useState(false);
  const [openCopyDayScheduleForm, setOpenCopyDayScheduleForm] = useState(null);
  const [copyDayScheduleFormData, setCopyDayScheduleFormData] = useState([]);
  const [copyScheduleDayIndex, setCopyScheduleDayIndex] = useState(0);
  const [isCopyScheduleDayChecked, setIsCopyScheduleDayChecked] = useState(Array(7).fill(false));
  const [allCopyScheduleDayChecked, setAllCopyScheduleDayChecked] = useState(false);

  const handleAddClick = (weekDayIndex) => {
    const newData = cloneDeep(scheduleData);
    newData[weekDayIndex].isSelected = true;
    newData[weekDayIndex].schedule.push({
      startTime: set(new Date(), { hours: 9, minutes: 0 }),
      endTime: set(new Date(), { hours: 17, minutes: 0 }),
    });
    setScheduleData(newData);
    setHasTimeUpdated(true);
    setIsFormUpdated(true);
  };

  const handleCopyCheckboxChange = (e, dayIndex) => {
    setIsCopyScheduleDayChecked((prevArray) => {
      const newArray = [...prevArray];
      newArray[dayIndex] = !newArray[dayIndex];
      return newArray;
    });

    if (e.target.checked) {
      setAllCopyScheduleDayChecked(
        [0, 1, 2, 3, 4, 5, 6].every((digit) =>
          [...copyDayScheduleFormData, dayIndex, copyScheduleDayIndex].includes(digit)
        )
      );
      setCopyDayScheduleFormData((prevList) => [...prevList, dayIndex]);
    } else {
      setAllCopyScheduleDayChecked(false);
      const updatedForm = copyDayScheduleFormData.filter((item) => item !== dayIndex);
      setCopyDayScheduleFormData(updatedForm);
    }
  };

  const handleOpen = (event, index) => {
    setOpenCopyDayScheduleForm(event.currentTarget);
    setCopyScheduleDayIndex(index);
  };

  const handleClose = () => {
    setIsCopyScheduleDayChecked(Array(7).fill(false));
    setAllCopyScheduleDayChecked(false);
    setOpenCopyDayScheduleForm(null);
  };

  const handleApplyCopy = (weekDayIndex) => {
    const newData = cloneDeep(scheduleData);
    const dataToCopy = cloneDeep(newData[weekDayIndex]);
    for (let day = 0; day < newData.length; day += 1) {
      if (copyDayScheduleFormData.includes(day)) {
        newData[day].schedule = Array.from(dataToCopy.schedule);
        newData[day].isSelected = dataToCopy.isSelected;
        newData[day].hasError = dataToCopy.hasError;
      }
    }
    setScheduleData(newData);
    setHasTimeUpdated(true);
    setIsFormUpdated(true);
    handleClose();
  };

  const handleCopyToAll = (e, weekDayIndex) => {
    setAllCopyScheduleDayChecked(e.target.checked);
    if (e.target.checked) {
      setIsCopyScheduleDayChecked(Array(7).fill(true));
      setCopyDayScheduleFormData(Array.from({ length: 7 }, (_, index) => index));
    } else {
      setIsCopyScheduleDayChecked(Array(7).fill(false));
      setCopyDayScheduleFormData([]);
    }
  };

  const isAlreadyExists = (time, timeItemIndex, weekDayIndex, updatedScheduleData = null) => {
    let isExists = false;
    if (!updatedScheduleData) {
      updatedScheduleData = scheduleData;
    }
    try {
      if (updatedScheduleData[weekDayIndex].schedule.length > 1) {
        const newScheduleData = cloneDeep(updatedScheduleData[weekDayIndex]);
        newScheduleData.schedule.splice(timeItemIndex, 1);
        isExists = newScheduleData.schedule.some((item) => {
          const range = {
            start: item.startTime,
            end: item.endTime,
          };
          if (isWithinInterval(time.startTime, range) || isWithinInterval(time.endTime, range)) {
            return true;
          }
          return false;
        });
      }
    } catch (error) {
      console.log(error);
    }
    return isExists;
  };

  const createScheduleData = (data) => {
    const schedule = { hasError: false, data: [] };
    const hasError = data.some((item) => item.hasError);
    if (hasError) {
      schedule.hasError = true;
      return schedule;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.schedule?.length > 0) {
        const newDaySchedule = data[i].schedule.map((item) => ({
          dayOfWeek: i + 1,
          fromTime: format(item.startTime, 'HH:mm'),
          tillTime: format(item.endTime, 'HH:mm'),
        }));

        schedule.data = schedule.data.concat(newDaySchedule);
      }
    }
    return schedule;
  };

  const saveScheduleData = async (data) => {
    const payload = {};
    payload.appId = appId;
    const schedule = createScheduleData(data);
    if (schedule.hasError) {
      return;
    }
    payload.schedule = { alertScheduleDtos: schedule.data };
    updateAppScheduleRequest(payload);
    setIsFormUpdated(false);
  };

  const validateTime = (weekDayIndex, timeItemIndex, startTime, endTime) => {
    let hasError = false;
    const newData = cloneDeep(scheduleData);
    const dayData = newData[weekDayIndex];
    if (dayData.schedule.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < dayData.schedule.length; i++) {
        if (
          timeItemIndex !== i &&
          (isEqual(dayData.schedule[i].startTime, startTime) || isEqual(dayData.schedule[i].endTime, endTime))
        ) {
          hasError = true;
          break;
        }
      }
    }
    return hasError;
  };

  const updateSchedule = (weekDayIndex, timeItemIndex, startTime, endTime, hasError = false) => {
    const newData = cloneDeep(scheduleData);
    newData[weekDayIndex].isSelected = true;
    newData[weekDayIndex].hasError = hasError;
    newData[weekDayIndex].schedule[timeItemIndex] = {
      startTime,
      endTime,
    };
    setScheduleData(newData);
  };

  const handleTimeRemove = (timeItemIndex, weekDayIndex) => {
    const newData = scheduleData;
    newData[weekDayIndex].schedule.splice(timeItemIndex, 1);
    newData[weekDayIndex].isSelected = newData[weekDayIndex].schedule.length > 0;
    if (newData[weekDayIndex].schedule.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < newData[weekDayIndex].schedule.length; i++) {
        const isExists = isAlreadyExists(newData[weekDayIndex].schedule[i], i, weekDayIndex, newData);
        if (isExists) {
          newData[weekDayIndex].hasError = true;
          break;
        }
        newData[weekDayIndex].hasError = false;
      }
    } else {
      newData[weekDayIndex].hasError =
        newData[weekDayIndex].schedule.length > 1 ? newData[weekDayIndex].hasError : false;
    }
    setScheduleData([...newData]);
    setIsFormUpdated(true);
  };

  const handleCheckboxChange = (checked, weekDayIndex) => {
    const newData = cloneDeep(scheduleData);
    newData[weekDayIndex].isSelected = checked;
    if (!checked) {
      newData[weekDayIndex].schedule = [];
    } else if (checked && newData[weekDayIndex]?.schedule?.length === 0) {
      newData[weekDayIndex].schedule = [
        {
          startTime: set(new Date(), { hours: 9, minutes: 0 }),
          endTime: set(new Date(), { hours: 17, minutes: 0 }),
        },
      ];
    }
    setScheduleData(newData);
    setIsFormUpdated(true);
  };

  const isSaveDisabled = () => {
    let isDisabled = false;
    const newData = cloneDeep(scheduleData);
    isDisabled = newData.some((item) => item.hasError);
    return isDisabled;
  };

  const handleTimeRange = (time, timeItemIndex, weekDayIndex) => {
    if (scheduleData[weekDayIndex].schedule.length > 1) {
      const hasRangeError = isAlreadyExists(time, timeItemIndex, weekDayIndex);
      return hasRangeError;
    }
    return false;
  };

  const generateKey = (pre) => `${pre}_${new Date().getTime()}`;

  useEffect(() => {
    if (schedularList?.length > 0) {
      const dateString = format(new Date(), 'MM/dd/yyyy');
      const newScheduleData = cloneDeep(weekdays);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < schedularList.length; i++) {
        const schdule = schedularList[i];
        const weekDay = newScheduleData[schdule.dayOfWeek - 1];
        weekDay.isSelected = true;
        weekDay.schedule.push({
          startTime: new Date(`${dateString} ${schdule.fromTime}`),
          endTime: new Date(`${dateString} ${schdule.tillTime}`),
        });
      }
      setScheduleData(newScheduleData);
    }
  }, [schedularList]);

  useEffect(() => {
    if (hasTimeUpdated) {
      setHasTimeUpdated(false);
    }
  }, [hasTimeUpdated]);

  useEffect(() => {
    if (openCopyDayScheduleForm === null) {
      setCopyDayScheduleFormData([]);
    }
  }, [openCopyDayScheduleForm]);

  useEffect(
    () => () => {
      resetSchedule();
    },
    []
  );

  const renderTimefield = (time, timeItemIndex, weekDayIndex) => (
    <TimePickerCmp
      cmpKey={`time-item-${weekDayIndex}-${timeItemIndex}`}
      weekDayIndex={weekDayIndex}
      timeItemIndex={timeItemIndex}
      handleTimeRemove={() => handleTimeRemove(timeItemIndex, weekDayIndex)}
      time={{ ...time }}
      key={timeItemIndex}
      isAlreadyExists={isAlreadyExists}
      updateSchedule={updateSchedule}
      translate={translate}
      hasTimeUpdated={hasTimeUpdated}
      setHasTimeUpdated={setHasTimeUpdated}
      validateTime={validateTime}
      hasRangeValidationError={handleTimeRange(time, timeItemIndex, weekDayIndex)}
      setIsFormUpdated={setIsFormUpdated}
    />
  );

  const renderWeekday = (item, index) => (
    <Box key={`${item.label}`}>
      <Grid container spacing={3} sx={{ paddingTop: 1 }}>
        <Grid
          item
          xs={2}
          style={{
            borderBottom: '1px solid rgba(26, 26, 26, 0.1)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isSelected}
                  onChange={(e, checked) => handleCheckboxChange(checked, index)}
                  name={item.label}
                  color="primary"
                />
              }
              label={item.label}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            borderBottom: '1px solid rgba(26, 26, 26, 0.1)',
          }}
        >
          {item.isSelected &&
            item.schedule.map((time, timeItemIndex) => {
              if (true) return renderTimefield({ ...time }, timeItemIndex, index);
              return null;
            })}
          {(!item.isSelected || item.schedule.length === 0) && (
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '8px 0px',
              }}
            >
              <Typography color="textSecondary" variant="body">
                {translate('app.unavailable-label')}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            borderBottom: '1px solid rgba(26, 26, 26, 0.1)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Tooltip title={translate('app.new-interval-lable')}>
              <IconButton component="span" onClick={() => handleAddClick(index)}>
                <Iconify icon={'eva:plus-fill'} />
              </IconButton>
            </Tooltip>
            <Tooltip title={translate('app.copy-schedule-lable')}>
              <IconButton component="span" onClick={(e) => handleOpen(e, index)}>
                <ContentCopy />
              </IconButton>
            </Tooltip>
            <MenuPopover
              openCopyDayScheduleForm={Boolean(openCopyDayScheduleForm)}
              anchorEl={openCopyDayScheduleForm}
              onClose={handleClose}
              direction="left"
              arrow="top-left"
              sx={{
                p: 0,
                mt: 1.5,
                ml: 0.75,
                '& .MuiMenuItem-root': {
                  typography: 'body2',
                  borderRadius: 0.75,
                },
                width: 220,
              }}
            >
              <Box sx={{ my: 1.5, px: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {translate('app.copy-schedule-lable')}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allCopyScheduleDayChecked}
                        onChange={(e) => handleCopyToAll(e, copyScheduleDayIndex)}
                        sx={{ marginLeft: 4 }}
                        size="small"
                      />
                    }
                    label={translate('app.all-option-label')}
                  />
                </Typography>
              </Box>

              {dayLabels.map((option, dayIndex) => (
                <MenuItem key={option}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isCopyScheduleDayChecked[dayIndex]}
                        disabled={dayIndex === copyScheduleDayIndex}
                        icon={dayIndex === copyScheduleDayIndex ? <CheckboxCheckedIcon /> : <CheckBoxOutlineBlank />}
                        onChange={(e) => handleCopyCheckboxChange(e, dayIndex)}
                        sx={{ marginRight: 2 }}
                      />
                    }
                    label={option}
                  />
                </MenuItem>
              ))}
              <Box
                sx={{
                  my: 1.5,
                  px: 2.5,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={() => handleApplyCopy(copyScheduleDayIndex)}
                  sx={{ borderRadius: 50, width: 150 }}
                  variant="contained"
                >
                  {translate('app.calendar-apply')}
                </Button>
              </Box>
            </MenuPopover>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card sx={{ padding: '16px 40px' }}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">{translate('app.schedule-header-lable')}</Typography>
        </Box>
        {scheduleData.map(renderWeekday)}
        <Stack spacing={3} alignItems="flex-end">
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Button onClick={onCancel} sx={{ marginRight: 1 }}>
              {translate('app.camera-cancel-label')}
            </Button>
            <Button onClick={() => saveScheduleData(scheduleData)} variant="contained" disabled={isSaveDisabled()}>
              {translate('app.camera-save-label')}
            </Button>
          </Box>
        </Stack>
      </Card>
    </LocalizationProvider>
  );
}
