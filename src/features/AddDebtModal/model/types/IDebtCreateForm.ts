export interface IDebtCreateForm {
  name: string,
  sum: string,
  amountPaid: string,
  dateFrom: Date,
  dateTo: Date,
  description: string,
  isPaid: boolean,
  isCashChange: boolean
}