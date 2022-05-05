import { format, getTime, formatDistanceToNow } from 'date-fns';

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
