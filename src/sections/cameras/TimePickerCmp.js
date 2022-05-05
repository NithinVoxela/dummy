import PropTypes from 'prop-types';
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { isAfter, isBefore, isValid } from "date-fns";
import React, { useEffect, useState } from "react";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import Iconify from '../../components/Iconify';


const TimePickerCmp = (props) => {
  const { cmpKey, handleTimeRemove, isAlreadyExists, timeItemIndex, weekDayIndex, time, updateSchedule, translate } = props;
  const [startTime, setStartTime] = useState(time.startTime);
  const [endTime, setEndTime] = useState(time.endTime);
  const [error, setError] = useState("");

  const handleDateValidation = () => {
    let hasError = true;
    if (!isValid(startTime)) {
      setError(translate("app.invalid-start-time-error-lable"));
    } else if (!isValid(endTime)) {
      setError(translate("app.invalid-end-time-error-lable"));
    } else if (isAfter(startTime, endTime)) {
      setError(
        translate("app.start-time-error-lable")
      );
    } else if (isBefore(endTime, startTime)) {
      setError(
        translate("app.end-time-error-lable")
      );
    } else {
      setError("");
      hasError = false;
    }
    updateSchedule(weekDayIndex, timeItemIndex, startTime, endTime, hasError);
  };

  const handleStartDateChange = date => {
    setStartTime(date);
  };

  const handleEndDateChange = date => {
    setEndTime(date);
  };

  useEffect(() => {
    const timeObject = { startTime, endTime };
    const hasRangeError = isAlreadyExists(timeObject, timeItemIndex, weekDayIndex);
    if (!hasRangeError) {
      handleDateValidation();
    } else {
      setError(
        translate("app.time-overlap-lable")
      );
      updateSchedule(weekDayIndex, timeItemIndex, startTime, endTime, true);
    }
  }, [startTime, endTime]);

  return (    
    <Box key={cmpKey} sx={{ padding: "8px 0px" }}>
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>        
        <MobileTimePicker
          margin="normal"
          label={translate("app.start-time-lable")}
          inputVariant="outlined"
          value={startTime}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
          inputProps={{
            style: { width: 250 }
          }}
          error={error.length > 0}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
        <Box style={{ padding: "0px 8px" }}>-</Box>
        <MobileTimePicker
          margin="normal"
          label={translate("app.end-time-lable")}
          value={endTime}
          onChange={handleEndDateChange}
          inputVariant="outlined"
          inputProps={{
            style: { width: 250 }
          }}
          error={error.length > 0}
          renderInput={(params) => <TextField {...params} size="small" />}
        />                  
        <Box style={{ padding: "0px 4px" }}>
          <Tooltip title={translate("app.remove-interval-lable")}>
            <IconButton component="span" onClick={handleTimeRemove}>
                <Iconify icon={'fluent:delete-20-regular'} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {error?.length > 0 && (
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </Box>    
  );
};

TimePickerCmp.propTypes = {  
  cmpKey: PropTypes.string,
  isAlreadyExists: PropTypes.bool,
  currentCamera: PropTypes.object,
  translate: PropTypes.func,
  handleTimeRemove: PropTypes.func,
  updateSchedule: PropTypes.func,
  timeItemIndex: PropTypes.number,
  weekDayIndex: PropTypes.number,
  time: PropTypes.any,
};

export default TimePickerCmp;
