import { ITransaction } from "./ITransaction";

export type FetchTransactionsReturn =  {
  totalPage: number,
  count: number,
  data: ITransaction[],
} | ITransaction[]