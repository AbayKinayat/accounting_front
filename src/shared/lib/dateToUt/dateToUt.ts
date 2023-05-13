export function dateToUt(date: Date) {
  return Math.round(date.getTime() / 1000);
}