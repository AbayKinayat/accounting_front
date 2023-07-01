export interface IDebtCreate {
  name: string,
  description: string,
  dateTo: number,
  dateFrom: number,
  sum: string,
  amountPaid: string,
  isDebtor: boolean,
  isCashChange: boolean,
  isPaid: boolean,
  statusId: number
}