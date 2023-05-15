import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTransactionsEditIsOpen = (state: StateSchema) => state.transactions.editIsOpen;