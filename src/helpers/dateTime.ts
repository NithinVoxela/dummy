import { format, formatDistanceToNowStrict } from "date-fns";

import { NUMBERS } from "configs/constants";

const convertUTCDateToLocalDate = (inputDate: string) => {
  let date = new Date();
  try {
    const arr: string[] = inputDate.split(/[\-\+ :T]/);

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

export const formatDate = (date: any) => {
  return format(convertUTCDateToLocalDate(date), "yyyy-MM-dd");
};

export const formatOnlyDateInWords = (date: any) => {
  return format(convertUTCDateToLocalDate(date), "do MMM yyyy'");
};

export const formatDateInWords = (date: any) => {
  return format(convertUTCDateToLocalDate(date), "do MMM yyyy',' h':'mm a");
};

export const formatDateInWordsWithoutTZ = (date: any) => {
  return format(new Date(date), "do MMM yyyy");
};

export const formatTimeAgo = (date: any) => {
  return formatDistanceToNowStrict(new Date(date));
};

export const getTimeInSeconds = (date: Date): number => {
  return date.getHours() * NUMBERS.SIXTY * NUMBERS.SIXTY + date.getMinutes() * NUMBERS.SIXTY + date.getSeconds();
};

export const setTimeForDate = (date: Date): Date => {
  const modifiedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  return modifiedDate;
};

export const firstDayOfPreviousMonth = () => {
  const today = new Date();
  const previousMonthDay = new Date();
  previousMonthDay.setMonth(today.getMonth() - 1);
  return new Date(previousMonthDay.getFullYear(), previousMonthDay.getMonth(), 1);
};

export const getDisplayValueForCustom = (from: Date, to: Date) => {
  return `${formatDateInWordsWithoutTZ(from)} - ${formatDateInWordsWithoutTZ(to)}`;
};
