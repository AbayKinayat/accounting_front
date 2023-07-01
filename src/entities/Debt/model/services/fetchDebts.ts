import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDebt } from "../types/IDebt";
import { ThunkConfig } from "shared/types/ThunkConfig";


export const fetchDebts = createAsyncThunk<
  IDebt[],
  void,
  ThunkConfig<string>
>(
  "debts/fetchDebts",
  async (_, { extra, getState, rejectWithValue }) => {
    try {
      const response = await extra.api.post<IDebt[]>("/debt");

      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Произошло ошибка при получении долгов, попробуйте перезагузить страницу");
    }
  }
)