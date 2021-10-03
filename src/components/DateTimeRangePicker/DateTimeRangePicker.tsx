import "react-day-picker/lib/style.css";
import { Button, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import DayPicker, { DayModifiers } from "react-day-picker";

import { translationService } from "services/translation/translation.service";
import {
  firstDayOfPreviousMonth,
  getDisplayValueForCustom,
  getTimeInSeconds,
  setTimeForDate
} from "src/helpers/dateTime";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles> {
  dateTimeHandler: (range: any) => void;
  fromDateTime: Date;
  toDateTime: Date;
  timeMin: number;
  timeMax: number;
  disableFutureDates?: boolean;
  disableEarlierDates?: boolean;
  includeDateTime?: boolean;
}

interface IDatePickerRange {
  from: Date;
  to: Date;
}

interface IDateTimePickerState {
  numberOfMonths: number;
  from: Date;
  to: Date;
}

class DateTimeRangePickerComponent extends React.PureComponent<IProps> {
  public state: IDateTimePickerState;
  public shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  public constructor(props: IProps) {
    super(props);
    const { fromDateTime, toDateTime } = this.props;

    this.state = {
      numberOfMonths: 2,
      from: fromDateTime || new Date(),
      to: toDateTime || new Date()
    };
  }

  public setCurrentTime = () => {
    const today = new Date();
    const currentTime = getTimeInSeconds(today);
    const time = {
      min: currentTime,
      max: currentTime
    };
    this.setState({ time });
  };

  public getDateForHeader = (date: Date) => {
    return `${this.shortMonthNames[date.getMonth()]} ${date.getDate().toString()}, ${date.getFullYear().toString()}`;
  };

  public getPreviousMonth = (startDate: Date) => {
    const previousMonth = startDate < firstDayOfPreviousMonth() ? startDate : firstDayOfPreviousMonth();

    return previousMonth;
  };

  public handleApplyClick = () => {
    const { from, to } = this.state;
    const { dateTimeHandler } = this.props;
    const fromDateTime = setTimeForDate(from);
    const toDateTime = setTimeForDate(to);
    const dateTimeDisplayValue = getDisplayValueForCustom(fromDateTime, toDateTime);
    dateTimeHandler({
      fromDateTime,
      toDateTime,
      dateTimeDisplayValue
    });
  };

  public handleDayClick = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled) {
      return;
    }
    const range: IDatePickerRange = DayPicker.DateUtils.addDayToRange(day, this.state);
    if (!range.from && !range.to) {
      return;
    }
    const from = setTimeForDate(range.from);
    const to = setTimeForDate(range.to);
    this.setState({ from, to });
  };

  public render() {
    const { classes, disableFutureDates, disableEarlierDates } = this.props;
    const { numberOfMonths, from, to } = this.state;
    const modifiers = { start: from, end: to };
    const previousMonth = this.getPreviousMonth(from);
    const futureDate = disableFutureDates ? new Date() : null;
    const earliestDate = disableEarlierDates ? 0 : null;
    const disabledDays = { after: futureDate, before: earliestDate };

    return (
      <div className={classes.root}>
        <div className={classes.calendarContainer}>
          <div className={classes.calendarHeader}>
            {from && to ? `${this.getDateForHeader(from)} - ${this.getDateForHeader(to)}` : ""}
          </div>
          <div className={classes.calendarAndFilterContainer}>
            <div>
              <div className={classes.dayPickerContainer}>
                <DayPicker
                  disabledDays={disabledDays}
                  className="Selectable"
                  numberOfMonths={numberOfMonths}
                  selectedDays={[from, { from, to }]}
                  initialMonth={previousMonth}
                  month={previousMonth}
                  modifiers={modifiers}
                  onDayClick={this.handleDayClick}
                />
              </div>
            </div>
            <div className={classes.filtersContainer}>
              <div className={classes.applyButton}>
                <div>
                  <Button name="applyButton" variant="contained" color="primary" onClick={this.handleApplyClick}>
                    {translationService.getMessageTranslation("calendar-apply", "Apply")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const DateTimeRangePicker = withStyles(styles)(DateTimeRangePickerComponent);
