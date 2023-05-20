import { dateToUt } from "shared/lib/dateToUt/dateToUt";

export const getLastWeekUt = (date: Date) => {
  const day = date.getDay();

  if (day !== 0) {
    date.setDate(date.getDate() + (7 - day))
  }

  return dateToUt(date);
}

// 1   2   3   4   5   6   0
// 14  15  16  17  18  19  20