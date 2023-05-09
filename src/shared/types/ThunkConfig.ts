import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";
import { AxiosInstance } from "axios";

export interface ThunkExtraArg {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArg,
  state: StateSchema
}