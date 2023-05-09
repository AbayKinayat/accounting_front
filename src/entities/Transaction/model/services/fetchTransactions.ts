import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITransaction } from "../types/ITransaction";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { IFetchTransactionsArg } from "../types/IFetchTransactionArg";
import { IFetchTransactionsReturn } from "../types/IFetchTransactionsReturn";

export const fetchTransactions = createAsyncThunk<
  IFetchTransactionsReturn,
  IFetchTransactionsArg,
  ThunkConfig<string>
>(
  "transactions/fetchTransactions",
  async ({ sortField, sortOrder }, { extra, rejectWithValue, getState }) => {
    try {

      const { page, limit } = getState().transactions;

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