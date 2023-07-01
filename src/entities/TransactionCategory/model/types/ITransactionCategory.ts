export interface ITransactionCategory { 
  id: number,
  name: string,
  iconId: string,
  typeId: number,
  createdAt: string,
  updatedAt: string,
  color: string,
  sum: number,
  budget: number,
  budgetProgress: [number, number]
}