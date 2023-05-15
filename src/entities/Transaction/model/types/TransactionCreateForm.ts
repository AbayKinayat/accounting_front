import { ITransactionCategory } from "entities/TransactionCategory";

export interface ITransactionCreateForm {
  amount: number,
  date?: Date,
  name: string,
  typeId: number,
  categoryId?: ITransactionCategory 
}