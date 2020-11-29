import { format as formatDate, parseISO } from "date-fns";

export const formatDateFunc = (date_x) => {
  return formatDate(parseISO(date_x?.registerDate), "MM/dd/yyyy");
};
