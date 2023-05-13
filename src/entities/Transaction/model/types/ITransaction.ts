import { ITransactionCategory } from "entities/TransactionCategory"

export interface ITransaction {
  id: number, 
  name: string,
  amount: number,
  categoryId: number,
  userId: number,
  typeId: number,
  Category?: ITransactionCategory, 
  createdAt: number, 
  updatedAt: number
}