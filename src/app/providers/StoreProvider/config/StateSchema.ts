import { ITransactionsSchema } from "entities/Transaction";
import { ITransactionCategorySchema } from "entities/TransactionCategory";
import { IUserSchema } from "entities/User";

export interface StateSchema {
  transactions: ITransactionsSchema,
  user: IUserSchema,
  transactionCategory: ITransactionCategorySchema
}