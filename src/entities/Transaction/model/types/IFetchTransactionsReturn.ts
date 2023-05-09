import { ITransaction } from "./ITransaction";

export interface IFetchTransactionsReturn {
  totalPage: number,
  count: number,
  data: ITransaction[],
}