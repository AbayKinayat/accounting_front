import { StateSchema } from "app/providers/StoreProvider/config/store";

export const getUserData = (state: StateSchema) => state.user.user;