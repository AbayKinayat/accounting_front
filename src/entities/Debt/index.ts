export type { IDebtSchema } from "./model/types/IDebtSchema";
export type { IDebt } from "./model/types/IDebt";
export { fetchDebts } from "./model/services/fetchDebts";
export { debtsReducer, debtsActions } from "./model/slice/debtSlice";
export { getDebtsData } from "./model/selectors/getDebtsData";
export { getDebtsLoading } from "./model/selectors/getDebtsLoading";
export { getDebtsError } from "./model/selectors/getDebtsError";
