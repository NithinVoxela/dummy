/* eslint-disable complexity */
import DateFnsUtils from "@date-io/date-fns";
import { Paper, Box, Checkbox, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format, set, isEqual, isWithinInterval } from "date-fns";
import { cloneDeep } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";

import { TimeRangeCmp } from "components/TimeRange/TimeRangePicker";
import { translationService } from "services/translation/translation.service";
import * as actions from "store/camera/camera.actions";
import { getAppScheduleList } from "store/camera/camera.selector";
import { getRedirectTo } from "store/redirect/redirect.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

interface IDispatchToProps {
  getAppSchedule: typeof actions.getAppScheduleLoadingRequest;
  updateAppScheduleRequest: typeof actions.updateAppScheduleRequest;
}

interface IStateToProps {
  redirectTo: string;
  schedularList: any;
}

interface IProps
  extends IStateToProps,
    IDispatchToProps,
    WithStyles<typeof styles>,
    RouteComponentProps<{ id: string }> {}

const SchedularTabComponent: React.FC<IProps> = ({
  classes,
  getAppSchedule,
  updateAppScheduleRequest,
  redirectTo,
  schedularList,
  match: {
    params: { id, appId }
  }
}) => {
  const weekdays = [
    {
      label: translationService.getMessageTranslation("weekday-mon-label", "Mon"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translationService.getMessageTranslation("weekday-tue-label", "Tue"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translationService.getMessageTranslation("weekday-wed-label", "Wed"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translationService.getMessageTranslation("weekday-thu-label", "Thu"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translationService.getMessageTranslation("weekday-fri-label", "Fri"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translationService.getMessageTranslation("weekday-sat-label", "Sat"),
      isSelected: false,
      hasError: false,
      schedule: []
    },
    {
      label: translationService.getMessageTranslation("weekday-sun-label", "Sun"),
      isSelected: false,
      hasError: false,
      schedule: []
    }
  ];
  const [scheduleData, setScheduleData] = useState(weekdays);

  const handleCheckboxChange = (checked: boolean, weekDayIndex: number) => {
    const newData = cloneDeep(scheduleData);
    newData[weekDayIndex].isSelected = checked;
    setScheduleData(newData);
  };

  const handleAddClick = (weekDayIndex: number) => {
    const newData = cloneDeep(scheduleData);
    const dayData = newData[weekDayIndex];
    dayData.isSelected = true;
    dayData.schedule.push({
      startTime: set(new Date(), { hours: 9, minutes: 0 }),
      endTime: set(new Date(), { hours: 17, minutes: 0 })
    });
    setScheduleData(newData);
  };

  const handleTimeRemove = (timeItemIndex: number, weekDayIndex: number) => {
    const newData = cloneDeep(scheduleData);
    const dayData = newData[weekDayIndex];
    dayData.schedule.splice(timeItemIndex, 1);
    dayData.isSelected = dayData.schedule.length > 0;
    setScheduleData(newData);
  };

  useEffect(() => {
    if (appId) {
      getAppSchedule({ appId });
    }
  }, [getAppSchedule]);

  const isAlreadyExists = (time: object, timeItemIndex: number, weekDayIndex: number) => {
    let isExists = false;
    try {
      if (scheduleData[weekDayIndex].schedule.length > 1) {
        const range = {
          start: time.startTime,
          end: time.endTime
        };
        const newScheduleData = cloneDeep(scheduleData[weekDayIndex]);
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

  const createScheduleData = (data: any) => {
    const schedule = { hasError: false, data: [] };
    const hasError = data.some(item => item.hasError);
    if (hasError) {
      schedule.hasError = true;
      return schedule;
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.schedule?.length > 0) {
        schedule.data = data[i].schedule.map(item => {
          return {
            dayOfWeek: i + 1,
            fromTime: format(item.startTime, "HH:mm"),
            tillTime: format(item.endTime, "HH:mm")
          };
        });
      }
    }
    return schedule;
  };
  const saveScheduleData = (data: any) => {
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
    weekDayIndex: number,
    timeItemIndex: number,
    startTime: Date,
    endTime: Date,
    hasError: boolean
  ) => {
    const newData = cloneDeep(scheduleData);
    const dayData = newData[weekDayIndex];
    dayData.isSelected = true;
    dayData.hasError = hasError;
    const weekDay = dayData.schedule[timeItemIndex];
    if (isEqual(weekDay.startTime, startTime) && isEqual(weekDay.endTime, endTime)) {
      return;
    }
    dayData.schedule[timeItemIndex] = {
      startTime,
      endTime
    };
    setScheduleData(newData);
    if (startTime && endTime) {
      saveScheduleData(newData);
    }
  };

  useEffect(() => {
    if (schedularList?.length > 0) {
      const dateString = format(new Date(), "MM/dd/yyyy");
      const newScheduleData = cloneDeep(scheduleData);
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

  const renderTimefield = (time: object, timeItemIndex: number, weekDayIndex: number) => {
    return (
      <TimeRangeCmp
        cmpKey={`time-item-${weekDayIndex}-${timeItemIndex}`}
        weekDayIndex={weekDayIndex}
        timeItemIndex={timeItemIndex}
        handleTimeRemove={() => handleTimeRemove(timeItemIndex, weekDayIndex)}
        time={time}
        isAlreadyExists={isAlreadyExists}
        updateSchedule={updateSchedule}
      />
    );
  };

  const renderWeekday = (item: any, index: number) => {
    return (
      <Box key={`${item.label}`}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={2}
            style={{
              borderBottom: "1px solid rgba(26, 26, 26, 0.1)",
              padding: "16px 0px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Box style={{ paddingTop: 12 }}>
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
              borderBottom: "1px solid rgba(26, 26, 26, 0.1)",
              padding: "18px 0px"
            }}
          >
            {item.isSelected &&
              item.schedule.map((time: any, timeItemIndex: number) => renderTimefield(time, timeItemIndex, index))}
            {!item.isSelected && (
              <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <Typography color="textSecondary" variant="h6" style={{ paddingTop: 4 }}>
                  {translationService.getMessageTranslation("unavailable-label", "Unavailable")}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              borderBottom: "1px solid rgba(26, 26, 26, 0.1)",
              padding: "18px 0px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Box style={{ marginTop: 8 }}>
              <Tooltip title={translationService.getMessageTranslation("new-interval-lable", "New interval")}>
                <IconButton component="span" onClick={() => handleAddClick(index)}>
                  <AddOutlinedIcon style={{ color: "#000" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper style={{ padding: "0px 40px" }}>
        <Box style={{ paddingTop: 16 }}>
          <Typography variant="h6">
            {translationService.getMessageTranslation("schedule-header-lable", "Set your weekly hours")}
          </Typography>
        </Box>
        {scheduleData.map(renderWeekday)}
      </Paper>
    </MuiPickersUtilsProvider>
  );
};

const mapDispatchToProps = {
  getCameraRequest: actions.getCameraRequest,
  updateAppScheduleRequest: actions.updateAppScheduleRequest,
  getAppSchedule: actions.getAppScheduleLoadingRequest
};

const mapStateToProps = (state: IApplicationState) => ({
  schedularList: getAppScheduleList(state),
  redirectTo: getRedirectTo(state)
});

export const SchedularTab = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(SchedularTabComponent))
);
