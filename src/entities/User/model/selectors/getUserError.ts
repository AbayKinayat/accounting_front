import { StateSchema } from "app/providers/StoreProvider/config/store";

export const getUserError = (state: StateSchema) => state.user.error;