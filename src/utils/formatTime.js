import { format, getTime, formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz'

// ----------------------------------------------------------------------

const convertUTCDateToLocalDate = (inputDate) => {
  let date = new Date();
  try {
    // eslint-disable-next-line
    const arr = inputDate.split(/[\-\+ :T]/);

    date.setUTCFullYear(arr[0]);
    date.setUTCMonth(arr[1] - 1);
    date.setUTCDate(arr[2]);
    date.setUTCHours(arr[3]);
    date.setUTCMinutes(arr[4]);
    date.setUTCSeconds(arr[5]);
  } catch (err) {
    date = new Date();
  }
  return date;
};

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'do MMM yyyy, h:mm a');
}

export function fDateTimeTZSuffix(date) {
  return format(convertUTCDateToLocalDate(date), 'do MMM yyyy, h:mm a');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function fDateWithTZ(date, timeZone) {
  return formatInTimeZone(new Date(date), timeZone, 'do MMM yyyy, h:mm a')
}

export function epochToLocalDateTime(newDate) {
  let formattedDate = null;  
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.timezone) {
      formattedDate = fDateWithTZ(newDate, user?.timezone);        
    } else {
      formattedDate = fDateTimeTZSuffix(newDate);
    }
  } catch (err) {
    formattedDate =  format(newDate, 'do MMM yyyy, h:mm a');  
  }
  return formattedDate;  
}
