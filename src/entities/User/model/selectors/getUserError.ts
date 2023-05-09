import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getUserError = (state: StateSchema) => state.user.error;