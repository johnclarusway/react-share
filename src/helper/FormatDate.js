import { format as formatDate, parseISO } from "date-fns";
export const formatDateFunc = (date) => {
  return formatDate(parseISO(date), "MM/dd/yyyy HH:mm");
};

export const getUTCDate = (dateString = Date.now()) => {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
    // date.getUTCSeconds()
  );
};

formatDate(new Date(), "MM/dd/yyyy HH:mm"); // returns local time
formatDate(getUTCDate(), "MM/dd/yyyy HH:mm"); // returns UTC time
