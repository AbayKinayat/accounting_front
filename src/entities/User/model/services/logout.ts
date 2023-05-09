import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";

export const logout = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  "user/logout",
  async (_, { extra, rejectWithValue }) => {
    try {
      await extra.api.post("/auth/logout");
      localStorage.removeItem("token");
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
)