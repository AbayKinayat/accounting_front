import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { IUserCreate } from "../types/IUserCreate";
import { fetchTransactionCategories } from "entities/TransactionCategory";

export const authByUsername = createAsyncThunk<IUser, IUserCreate, ThunkConfig<string>>(
  "user/authByUserName",
  async (data, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<{
        accessToken: string,
        refreshToken: string,
        user: IUser
      }>("/auth", data);

      if (!response.data) return rejectWithValue("Не предвиденная ошибка");

      localStorage.setItem("token", response.data.accessToken);

      dispatch(fetchTransactionCategories())

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
); 