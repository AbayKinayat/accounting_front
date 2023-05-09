import { ITransactionsSchema } from "entities/Transaction";
import { IUserSchema } from "entities/User";

export interface StateSchema {
  transactions: ITransactionsSchema,
  user: IUserSchema
}