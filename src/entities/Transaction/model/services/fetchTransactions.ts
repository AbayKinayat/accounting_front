import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { IFetchTransactionsReturn } from "../types/IFetchTransactionsReturn";

export const fetchTransactions = createAsyncThunk<
  IFetchTransactionsReturn,
  void,
  ThunkConfig<string>
>(
  "transactions/fetchTransactions",
  async (_, { extra, rejectWithValue, getState }) => {
    try {
      const { page, limit, sortField, sortOrder } = getState().transactions;

      const response = await extra.api.post<IFetchTransactionsReturn>("/transactions", {
        page,
        limit,
        sortField,
        sortOrder
      });

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
)