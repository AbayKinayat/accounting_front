import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { FetchTransactionsReturn } from "../types/FetchTransactionsReturn";

export const fetchTransactions = createAsyncThunk<
  FetchTransactionsReturn,
  void | { startUt: number, endUt: number },
  ThunkConfig<string>
>(
  "transactions/fetchTransactions",
  async (body, { extra, rejectWithValue, getState }) => {
    try {
      const { page, limit, sortField, sortOrder } = getState().transactions;

      const actualBody = body || { page, limit, sortField, sortOrder }

      const response = await extra.api.post<FetchTransactionsReturn>("/transactions", actualBody);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
)