import { dateToUt } from "shared/lib/dateToUt/dateToUt";

export function getLastYearUt(date: Date) {
  const year = date.getFullYear();
  const day = new Date(year, 12, 0, 23, 59, 59);

  return dateToUt(day);
}
