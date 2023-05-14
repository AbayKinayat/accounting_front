import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTransactionsTotal = (state: StateSchema) => state.transactions.total;