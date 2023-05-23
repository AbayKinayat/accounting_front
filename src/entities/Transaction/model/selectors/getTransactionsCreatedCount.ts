import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTransactionsCreatedCount = (state: StateSchema) => state.transactions.createdCount;