import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTransactionsIsOpen = (state: StateSchema) => state.transactions.isOpen;