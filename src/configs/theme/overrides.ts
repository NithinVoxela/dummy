export const overrides = {
  MuiCardHeader: {
    action: {
      marginTop: "-4px",
      marginRight: "-4px"
    }
  },
  MuiPickersDay: {
    day: {
      fontWeight: "300"
    }
  },
  MuiPickersYear: {
    root: {
      height: "64px"
    }
  },
  MuiPickersCalendar: {
    transitionContainer: {
      marginTop: "6px"
    }
  },
  MuiPickersCalendarHeader: {
    iconButton: {
      backgroundColor: "transparent",
      "& > *": {
        backgroundColor: "transparent"
      }
    },
    switchHeader: {
      marginTop: "2px",
      marginBottom: "4px"
    }
  },
  MuiPickersClock: {
    container: {
      margin: `32px 0 4px`
    }
  },
  MuiPickersClockNumber: {
    clockNumber: {
      left: `calc(50% - 16px)`,
      width: "32px",
      height: "32px"
    }
  },
  MuiPickerDTHeader: {
    dateHeader: {
      "& h4": {
        fontSize: "2.125rem",
        fontWeight: 400
      }
    },
    timeHeader: {
      "& h3": {
        fontSize: "3rem",
        fontWeight: 400
      }
    }
  },
  MuiPickersTimePicker: {
    hourMinuteLabel: {
      "& h2": {
        fontSize: "3.75rem",
        fontWeight: 300
      }
    }
  },
  MuiPickersToolbar: {
    toolbar: {
      "& h4": {
        fontSize: "2.125rem",
        fontWeight: 400
      }
    }
  },
  MuiTableCell: {
    root: {
      borderBottom: "1px solid rgba(145, 158, 171, 0.24)"
    },
    head: {
      fontSize: "0.875rem",
      color: "rgba(0, 0, 0, 0.87)"
    }
  },
  MuiPaper: {
    elevation1: {
      boxShadow: "rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px"
    }
  }
};
