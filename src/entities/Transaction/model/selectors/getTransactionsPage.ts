import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTransactionsPage = (state: StateSchema) => state.transactions.page;