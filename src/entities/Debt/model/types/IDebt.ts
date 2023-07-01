export interface IDebt {
  id: number,
  name: string,
  dateFrom: number,
  dateTo: number,
  description: string,
  isDebtor: boolean,
  isPaid: boolean,
  userId: number,
  amountPaid: number,
  sum: number,
  statusId: number,
  createdAt: string,
  updatedAt: string,
  progress: [number, number]
}