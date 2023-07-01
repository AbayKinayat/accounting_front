import { IDebt } from "./IDebt";

export interface IDebtSchema {
  loading: boolean,
  error: string,
  debts: IDebt[]
}