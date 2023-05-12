import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { fetchTransactionCategories } from "entities/TransactionCategory";

export const refreshUser = createAsyncThunk<IUser, undefined, ThunkConfig<string>>(
  "user/refreshUser",
  async (_, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<{
        accessToken: string,
        refreshToken: string,
        user: IUser
      }>("/auth/refresh");

      if (!response.data) return rejectWithValue("Не предвиденная ошибка");

      localStorage.setItem("token", response.data.accessToken);

      dispatch(fetchTransactionCategories())

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
); 