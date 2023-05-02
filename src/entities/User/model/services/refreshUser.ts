import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { ThunkConfig } from "shared/types/ThunkConfig";

export const refreshUser = createAsyncThunk<IUser, undefined, ThunkConfig<string>>(
  "user/refreshUser",
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.post<{
        accessToken: string,
        refreshToken: string,
        user: IUser
      }>("/auth/refresh");

      if (!response.data) return rejectWithValue("Не предвиденная ошибка");

      localStorage.setItem("token", response.data.accessToken);

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
); 