import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITransactionCategory } from "../types/ITransactionCategory";
import { ThunkConfig } from "shared/types/ThunkConfig";

export const fetchTransactionCategories = createAsyncThunk<
  ITransactionCategory[],
  void,
  ThunkConfig<string>
>(
  "transactionCategory/fetchTransactionCategories",
  async (_, { extra,  rejectWithValue  }) => {
    try {
      const response = await extra.api.post<ITransactionCategory[]>("/categories");
      
      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
)