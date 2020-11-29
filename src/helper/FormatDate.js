import { format as formatDate, parseISO } from "date-fns";

export const formatDateFunc = (userDetail) => {
  return formatDate(parseISO(userDetail?.registerDate), "MM/dd/yyyy");
};
