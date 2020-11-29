import { format as formatDate, parseISO, isValid } from "date-fns";

export const formatDateFunc = (date) => {
  return formatDate(parseISO(date), "MM/dd/yyyy HH:mm");
};
