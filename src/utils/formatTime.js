import { format, formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz'

// ----------------------------------------------------------------------

export const DEFAULT_DATE_FORMAT = 'do MMM yyyy, h:mm a'

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

export function fDateTimeTZSuffix(date) {
  return format(convertUTCDateToLocalDate(date), 'do MMM yyyy, h:mm a');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function formatEpochTime(value, timezone, format = DEFAULT_DATE_FORMAT) {
  const date = new Date(value);
  return formatDate(date, timezone, format);
}

export function formatUTCDateString(dateStr, timezone, format = DEFAULT_DATE_FORMAT) {
  const date = new Date(`${dateStr}Z`);
  return formatDate(date, timezone, format);
}

export function formatDate(date, timezone, format = DEFAULT_DATE_FORMAT) {
  let formattedDate = null;  
  try {
    formattedDate =  (timezone) ? formatInTimeZone(date, timezone, format) : format(date, format);
  } catch (err) {
    formattedDate =  '';  
  }
  return formattedDate;  
}
