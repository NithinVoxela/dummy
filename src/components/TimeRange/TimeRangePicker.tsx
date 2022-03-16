import { Box, IconButton, Tooltip, Typography } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { isAfter, isBefore, isValid } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";

import { translationService } from "services/translation/translation.service";

export const TimeRangeCmp = (props: any) => {
  const { cmpKey, handleTimeRemove, isAlreadyExists, timeItemIndex, weekDayIndex, time, updateSchedule } = props;
  const [startTime, setStartTime] = useState(time.startTime);
  const [endTime, setEndTime] = useState(time.endTime);
  const [error, setError] = useState("");

  const handleDateValidation = () => {
    let hasError = true;
    if (!isValid(startTime)) {
      setError(translationService.getMessageTranslation("invalid-start-time-error-lable", "Invalid Start Time."));
    } else if (!isValid(endTime)) {
      setError(translationService.getMessageTranslation("invalid-end-time-error-lable", "Invalid End Time."));
    } else if (isAfter(startTime, endTime)) {
      setError(
        translationService.getMessageTranslation("start-time-error-lable", "Start Time should be less than End Time.")
      );
    } else if (isBefore(endTime, startTime)) {
      setError(
        translationService.getMessageTranslation("end-time-error-lable", "End Time should be greater than Start Time.")
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
        translationService.getMessageTranslation("time-overlap-lable", "Times overlap with another set of times.")
      );
      updateSchedule(weekDayIndex, timeItemIndex, startTime, endTime, true);
    }
  }, [startTime, endTime]);

  return (
    <React.Fragment key={cmpKey}>
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <KeyboardTimePicker
          margin="normal"
          label={translationService.getMessageTranslation("start-time-lable", "Start time")}
          inputVariant="outlined"
          value={startTime}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
          inputProps={{
            style: { width: 250, padding: "12px 0px 12px 8px" }
          }}
          error={error.length > 0}
        />
        <Box style={{ padding: "0px 8px" }}>-</Box>
        <KeyboardTimePicker
          margin="normal"
          label={translationService.getMessageTranslation("end-time-lable", "End time")}
          value={endTime}
          onChange={handleEndDateChange}
          inputVariant="outlined"
          inputProps={{
            style: { width: 250, padding: "12px 0px 12px 8px" }
          }}
          error={error.length > 0}
        />
        <Box style={{ padding: "0px 4px" }}>
          <Tooltip title={translationService.getMessageTranslation("remove-interval-lable", "Remove interval")}>
            <IconButton component="span" onClick={handleTimeRemove}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {error?.length > 0 && (
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </React.Fragment>
  );
};
