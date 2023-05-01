import { StateSchema } from "app/providers/StoreProvider/config/store";
import { AxiosInstance } from "axios";

export interface ThunkExtraArg {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArg
}