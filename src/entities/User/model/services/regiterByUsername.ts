import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { IUserCreate } from "../types/IUserCreate";
import { fetchTransactionCategories } from "entities/TransactionCategory";

export const registerByUsername = createAsyncThunk<IUser, IUserCreate, ThunkConfig<string>>(
  "user/registerByUsername",
  async (data, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<{
        accessToken: string,
        refreshToken: string,
        user: IUser
      }>("/auth/registration", data);

      if (!response.data) return rejectWithValue("Не предвиденная ошибка");

      dispatch(fetchTransactionCategories({}))

      localStorage.setItem("token", response.data.accessToken);

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
); 