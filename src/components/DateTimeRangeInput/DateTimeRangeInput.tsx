import { ClickAwayListener, IconButton, InputAdornment, Tooltip, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import classNames from "classnames";
import * as React from "react";

import { DateTimeRangePicker } from "components/DateTimeRangePicker";
import { TextInput } from "components/TextInput";
import { translationService } from "services/translation/translation.service";
import { getTimeInSeconds } from "src/helpers/dateTime";

import { styles } from "./styles";

export interface IDateTimePickerModel {
  fromDateTime: Date;
  toDateTime: Date;
  timeMin?: number;
  timeMax?: number;
  dateTimeDisplayValue: string;
}

export interface ITimeModel {
  min: number;
  max: number;
}

type CalenderBeginOption = "start" | "end";
type WidthSizeOption = "xs" | "sm" | "md" | "lg" | "auto";

interface IProps extends WithStyles<typeof styles> {
  onDateTimeFilterChange: (range: IDateTimePickerModel) => void;
  initialFromDateTime: Date;
  initialToDateTime: Date;
  dateTimeDisplayValue: string;
  emptyLabel?: boolean;
  calendar?: CalenderBeginOption;
  noUnderline?: boolean;
  minWidth?: WidthSizeOption;
  disableFutureDates?: boolean;
  disableEarlierDates?: boolean;
  showCalendarArrow?: boolean;
  includeDateTime?: boolean;
  classesProps?: {
    textInput?: string;
  };
}

interface IState {
  open: boolean;
}

class DateTimeRangeInputComponent extends React.PureComponent<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  public handleTooltipClose = () => {
    this.setState({ open: false });
  };

  public handleTooltipToggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  public dateTimeHandler = (datePickerModel: IDateTimePickerModel) => {
    const { onDateTimeFilterChange } = this.props;
    this.handleTooltipClose();
    onDateTimeFilterChange(datePickerModel);
  };

  public getAdornment = () => {
    const { classes, calendar, dateTimeDisplayValue } = this.props;

    return calendar === "start"
      ? {
          startAdornment: (
            <InputAdornment position="start">
              <DateRangeIcon className={classes.icon} />
            </InputAdornment>
          )
        }
      : {
          endAdornment: (
            <>
              {!!dateTimeDisplayValue && (
                <IconButton className={classes.closeBtn}
                  onClick={() =>
                    this.dateTimeHandler({ fromDateTime: null, toDateTime: null, dateTimeDisplayValue: "" })
                  }
                  style={{ margin: "-0.5em" }}
                >
                  <Close className={classes.icon} fontSize="small" />
                </IconButton>
              )}
              <InputAdornment position="end">
                <DateRangeIcon className={classes.icon} fontSize="small" />
              </InputAdornment>
            </>
          )
        };
  };

  public render() {
    const {
      classes,
      emptyLabel,
      dateTimeDisplayValue,
      minWidth,
      disableFutureDates,
      disableEarlierDates,
      initialFromDateTime,
      initialToDateTime,
      showCalendarArrow,
      includeDateTime,
      classesProps = {}
    } = this.props;
    const { open } = this.state;

    const fromDateTime = initialFromDateTime || new Date();
    const toDateTime = initialToDateTime || new Date();
    const timeMin = getTimeInSeconds(fromDateTime);
    const timeMax = getTimeInSeconds(toDateTime);

    const label = emptyLabel
      ? null
      : translationService.getMessageTranslation("select-date-label", "Select Date and Time Range");

    const inputProps = {
      ...this.getAdornment()
    };

    // @ts-ignore
    const tooltipContainerClasses = classes[`minWidth_${minWidth}`];

    return (
      <ClickAwayListener onClickAway={this.handleTooltipClose}>
        <div className={tooltipContainerClasses}>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={this.handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            classes={{ tooltip: classes.tooltip, popper: classes.popper }}
            title={
              <DateTimeRangePicker
                dateTimeHandler={this.dateTimeHandler}
                fromDateTime={fromDateTime}
                toDateTime={toDateTime}
                timeMin={timeMin}
                timeMax={timeMax}
                disableFutureDates={disableFutureDates}
                disableEarlierDates={disableEarlierDates}
                includeDateTime={includeDateTime}
              />
            }
          >
            <div className={classNames(classes.minWidth_auto, classes.calendarDisplayAliasContainer)}>
              <TextInput
                minWidth={minWidth || "md"}
                className={classNames(classes.dateTimePicker, classesProps.textInput)}
                name="dateTimePicker"
                label={label}
                type="text"
                value={dateTimeDisplayValue}
                onClick={this.handleTooltipToggle}
                autoComplete="off"
                InputProps={inputProps}
              />
              {showCalendarArrow && (
                <ExpandLessIcon onClick={this.handleTooltipToggle} className={classes.calendarViewIcon} />
              )}
            </div>
          </Tooltip>
        </div>
      </ClickAwayListener>
    );
  }
}

export const DateTimeRangeInput = withStyles(styles)(DateTimeRangeInputComponent);
