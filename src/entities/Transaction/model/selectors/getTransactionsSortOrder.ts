import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTransactionsSortOrder = (state: StateSchema) => state.transactions.sortOrder; 