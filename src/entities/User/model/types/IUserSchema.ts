import { IUser } from "./IUser";

export interface IUserSchema {
  user: IUser | null,
  loading: boolean,
  error: string
}