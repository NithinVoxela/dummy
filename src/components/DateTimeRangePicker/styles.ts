import { createStyles } from "@material-ui/core/styles";

export const styles = () =>
  createStyles({
    root: {
      "& .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside)": {
        opacity: 0.5
      },
      "& .Selectable .DayPicker-Day": {
        borderRadius: "0"
      },
      "& .Selectable .DayPicker-Day--start": {
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%"
      },
      "& .Selectable .DayPicker-Day--end": {
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%"
      },
      "& .DayPicker": {
        fontSize: 15,
        height: 285
      },
      "& .DayPicker-wrapper": {
        paddingBottom: 0
      }
    },
    calendarContainer: {
      fontSize: 15
    },
    calendarHeader: {
      minHeight: 50,
      borderBottom: "1px solid rgb(21, 101, 192)",
      textAlign: "center",
      padding: "15px 0 0 15px"
    },
    calendarAndFilterContainer: {
      display: "flex"
    },
    filtersContainer: {
      flex: 1,
      // borderBottom: "1px solid rgb(21, 101, 192)",
      // borderRight: "1px solid rgb(21, 101, 192)"
    },
    dayPickerContainer: {
      // borderBottom: `1px solid rgb(21, 101, 192)`,
      // borderLeft: "1px solid rgb(21, 101, 192)"
    },
    applyButton: {
      padding: "10px 5px 10px 15px"
    }
  });
