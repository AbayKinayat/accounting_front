import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { FetchTransactionsReturn } from "../types/FetchTransactionsReturn";

export const fetchTransactions = createAsyncThunk<
  FetchTransactionsReturn,
  string | void,
  ThunkConfig<string>
>(
  "transactions/fetchTransactions",
  async (search, { extra, rejectWithValue, getState }) => {
    try {
      const { page, limit, sortField, sortOrder, startUt, endUt, isPagination } = getState().transactions;

      const actualBody = {  
        sortField, 
        sortOrder, 
        startUt, 
        endUt,
        search
      }

      if (isPagination) Object.assign(actualBody, { page, limit });

      const response = await extra.api.post<FetchTransactionsReturn>("/transactions", actualBody);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
)