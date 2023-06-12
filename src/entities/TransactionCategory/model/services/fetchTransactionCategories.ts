import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITransactionCategory } from "../types/ITransactionCategory";
import { ThunkConfig } from "shared/types/ThunkConfig";

export const fetchTransactionCategories = createAsyncThunk<
  ITransactionCategory[],
  { startUt?: number, endUt?: number },
  ThunkConfig<string>
>(
  "transactionCategory/fetchTransactionCategories",
  async ({ startUt, endUt }, { extra,  rejectWithValue  }) => {
    try {
      const response = await extra.api.post<ITransactionCategory[]>("/categories", { startUt, endUt });
      
      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
)