import { ITransaction } from "./ITransaction";

export interface ITransactionsSchema {
  transactions: ITransaction[],
  page: number,
  limit: number,
  total: number,
  loading: boolean,
  error: string,
  isOpen: boolean
}