import { format, formatDistanceToNowStrict } from "date-fns";

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "dd/MM/yy',' h':'mm a");
};

export const formatDateInWords = (date: Date) => {
  return format(new Date(date), "d MMMM', ' yyyy',' h':'mm a");
};

export const formatTimeAgo = (date: Date) => {
  return formatDistanceToNowStrict(new Date(date));
};
