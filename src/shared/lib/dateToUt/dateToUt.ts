export function dateToUt(date: Date) {
  return Math.trunc(date.getTime() / 1000);
}