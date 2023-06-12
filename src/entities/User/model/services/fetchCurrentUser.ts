import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { ThunkConfig } from "shared/types/ThunkConfig";


export const fetchCurrentUser = createAsyncThunk<IUser, void, ThunkConfig<string>>(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.post<IUser>("/auth/current");

      return response.data
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Ошибка при получении данных пользователя, попробуйте переавторизоватся")
    }
  }
)