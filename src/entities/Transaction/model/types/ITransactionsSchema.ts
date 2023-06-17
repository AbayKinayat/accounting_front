import { DateFilterType } from "widgets/Header";
import { ITransaction } from "./ITransaction";

export interface ITransactionsSchema {
  transactions: ITransaction[],
  page: number,
  limit: number,
  total: number,
  loading: boolean,
  error: string,
  isOpen: boolean,
  createInitialDate: Date | undefined,
  editIsOpen: boolean,
  editId: number | undefined,
  getTransactionsWhenCreate: boolean,
  createdCount: number,
  startUt: number,
  endUt: number,
  sortField: string,
  sortOrder: number,
  dateType: DateFilterType,
  isPagination: boolean
}