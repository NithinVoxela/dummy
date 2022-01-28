import { format, formatDistanceToNowStrict } from "date-fns";

import { NUMBERS } from "configs/constants";

const convertUTCDateToLocalDate = inputDate => {
  return new Date(inputDate.toString() + "Z");
};

export const formatDate = (date: Date) => {
  return format(convertUTCDateToLocalDate(new Date(date)), "yyyy-MM-dd");
};

export const formatOnlyDateInWords = (date: Date) => {
  return format(convertUTCDateToLocalDate(new Date(date)), "do MMM yyyy'");
};

export const formatDateInWords = (date: Date) => {
  return format(convertUTCDateToLocalDate(new Date(date)), "do MMM yyyy',' h':'mm a");
};

export const formatDateInWordsWithoutTZ = (date: Date) => {
  return format(new Date(date), "do MMM yyyy");
};

export const formatTimeAgo = (date: Date) => {
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
