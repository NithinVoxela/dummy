import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { format, set, isEqual, isWithinInterval } from "date-fns";
import { cloneDeep } from "lodash";
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
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// components
import Iconify from '../../components/Iconify';
import TimePickerCmp from "./TimePickerCmp";
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
  const { translate, appId, updateAppScheduleRequest, schedularList, resetSchedule, onCancel } = props;

  const weekdays = [
    {
      label: translate("app.weekday-mon-label"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translate("app.weekday-tue-label"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translate("app.weekday-wed-label"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translate("app.weekday-thu-label"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translate("app.weekday-fri-label"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translate("app.weekday-sat-label"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translate("app.weekday-sun-label"),
      isSelected: false,
      hasError: false,
      schedule: []
    }
  ];
  const [scheduleData, setScheduleData] = useState(weekdays);
  const [hasTimeUpdated, setHasTimeUpdated] = useState(false);

  const handleAddClick = (weekDayIndex) => {
    const newData = cloneDeep(scheduleData);
    const dayData = newData[weekDayIndex];
    dayData.isSelected = true;
    dayData.schedule.push({
      startTime: set(new Date(), { hours: 9, minutes: 0 }),
      endTime: set(new Date(), { hours: 17, minutes: 0 })
    });
    setScheduleData(newData);
    setHasTimeUpdated(true);
  };

  const isAlreadyExists = (time, timeItemIndex, weekDayIndex, updatedScheduleData=null) => {
    let isExists = false;
    if (!updatedScheduleData) {
      updatedScheduleData = scheduleData;
    }
    try {
      if (updatedScheduleData[weekDayIndex].schedule.length > 1) {
        const range = {
          start: time.startTime,
          end: time.endTime
        };
        const newScheduleData = cloneDeep(updatedScheduleData[weekDayIndex]);
        newScheduleData.schedule.splice(timeItemIndex, 1);
        isExists = newScheduleData.schedule.some(
          item => isWithinInterval(item.startTime, range) || isWithinInterval(item.endTime, range)
        );
      }
    } catch (error) {
      console.log(error);
    }
    return isExists;
  };

  const createScheduleData = (data) => {
    const schedule = { hasError: false, data: [] };
    const hasError = data.some(item => item.hasError);
    if (hasError) {
      schedule.hasError = true;
      return schedule;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.schedule?.length > 0) {
        const newDaySchedule = data[i].schedule.map(item => ({
            dayOfWeek: i + 1,
            fromTime: format(item.startTime, "HH:mm"),
            tillTime: format(item.endTime, "HH:mm")
          }));

        schedule.data = schedule.data.concat(newDaySchedule);
      }
    }
    return schedule;
  };
  const saveScheduleData = async(data) => {
    const payload = {};
    payload.appId = appId;
    const schedule = createScheduleData(data);
    if (schedule.hasError) {
      return;
    }
    payload.schedule = { alertScheduleDtos: schedule.data };
    updateAppScheduleRequest(payload);
  };

  const updateSchedule = (
    weekDayIndex,
    timeItemIndex,
    startTime,
    endTime,
    hasError
  ) => {
    const newData = cloneDeep(scheduleData);
    const dayData = newData[weekDayIndex];
    dayData.isSelected = true;
    dayData.hasError = hasError;
    const weekDay = dayData.schedule[timeItemIndex];
    if (
      dayData.schedule.length > 1 &&
      (hasError || (isEqual(weekDay.startTime, startTime) && isEqual(weekDay.endTime, endTime)))
    ) {
      dayData.hasError = true;
    } else {
      dayData.hasError = false;
    }
    dayData.schedule[timeItemIndex] = {
      startTime,
      endTime
    };
    setScheduleData(newData);    
  };

  const handleTimeRemove = (timeItemIndex, weekDayIndex) => {
    const newData = cloneDeep(scheduleData);
    const dayData = newData[weekDayIndex];
    dayData.schedule.splice(timeItemIndex, 1);
    dayData.isSelected = dayData.schedule.length > 0;
    if (dayData.schedule.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i<dayData.schedule.length; i++) {
        const isExists = isAlreadyExists(dayData.schedule[i], i, weekDayIndex, newData);
        if (isExists) {
          dayData.hasError = true;
          break;
        }
        dayData.hasError = false;
      }
    } else {
      dayData.hasError = dayData.schedule.length > 1 ? dayData.hasError : false;
    }        
    setScheduleData(newData);    
  };

  const handleCheckboxChange = (checked, weekDayIndex) => {
    const newData = cloneDeep(scheduleData); 
    newData[weekDayIndex].isSelected = checked;
    if (!checked) {
      newData[weekDayIndex].schedule = [];
    } else if (checked && newData[weekDayIndex]?.schedule?.length === 0) {
      newData[weekDayIndex].schedule = [{
        startTime: set(new Date(), { hours: 9, minutes: 0 }),
        endTime: set(new Date(), { hours: 17, minutes: 0 })
      }];
    }
    setScheduleData(newData);    
  };

  const isSaveDisabled = () => {
    let isDisabled = false;
    const newData = cloneDeep(scheduleData);
    isDisabled = newData.some(item => item.hasError);
    return isDisabled;
  };

  useEffect(() => {
    if (schedularList?.length > 0) {
      const dateString = format(new Date(), "MM/dd/yyyy");
      const newScheduleData = cloneDeep(weekdays);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < schedularList.length; i++) {
        const schdule = schedularList[i];
        const weekDay = newScheduleData[schdule.dayOfWeek - 1];
        weekDay.isSelected = true;
        weekDay.schedule.push({
          startTime: new Date(`${dateString} ${schdule.fromTime}`),
          endTime: new Date(`${dateString} ${schdule.tillTime}`)
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
    return () => {      
      resetSchedule();     
    };
  }, []);

  const renderTimefield = (time, timeItemIndex, weekDayIndex) => (
      <TimePickerCmp
        cmpKey={`time-item-${weekDayIndex}-${timeItemIndex}`}
        weekDayIndex={weekDayIndex}
        timeItemIndex={timeItemIndex}
        handleTimeRemove={() => handleTimeRemove(timeItemIndex, weekDayIndex)}
        time={time}
        isAlreadyExists={isAlreadyExists}
        updateSchedule={updateSchedule}
        translate={translate}
        hasTimeUpdated={hasTimeUpdated}
        setHasTimeUpdated={setHasTimeUpdated}
      />
    );

  const renderWeekday = (item, index) => (
      <Box key={`${item.label}`}>
        <Grid container spacing={3} sx={{ paddingTop: 1}}>
          <Grid
            item
            xs={2}
            style={{
              borderBottom: "1px solid rgba(26, 26, 26, 0.1)",              
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start"
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
              borderBottom: "1px solid rgba(26, 26, 26, 0.1)"              
            }}
          >
            {item.isSelected &&
              item.schedule.map((time, timeItemIndex) => renderTimefield(time, timeItemIndex, index))}
            {(!item.isSelected || item.schedule.length === 0) && (
              <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "8px 0px" }}>
                <Typography color="textSecondary" variant="body">
                  {translate("app.unavailable-label")}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              borderBottom: "1px solid rgba(26, 26, 26, 0.1)",             
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Box>
              <Tooltip title={translate("app.new-interval-lable")}>
                <IconButton component="span" onClick={() => handleAddClick(index)}>
                  <Iconify icon={'eva:plus-fill'} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card sx={{ padding: "16px 40px" }}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">
            {translate("app.schedule-header-lable")}
          </Typography>
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
