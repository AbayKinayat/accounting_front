import { dateToUt } from "shared/lib/dateToUt/dateToUt";

export function getFirstYearUt(date: Date) {
  const year = date.getFullYear();
  const day = new Date(year, 0, 1);

  return dateToUt(day);
}
