import { dateToUt } from "shared/lib/dateToUt/dateToUt";

export function getLastYearUt(date: Date) {
  const year = date.getFullYear();
  const day = new Date(year, 11, 0);

  return dateToUt(day);
}
