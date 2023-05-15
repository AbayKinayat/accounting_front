import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTransactionCategoryData = (state: StateSchema) => state.transactionCategory.categories;