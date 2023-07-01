import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITransactionCategory } from "../types/ITransactionCategory";
import { ThunkConfig } from "shared/types/ThunkConfig";

export const fetchTransactionCategories = createAsyncThunk<
  ITransactionCategory[],
  void,
  ThunkConfig<string>
>(
  "transactionCategory/fetchTransactionCategories",
  async (_, { extra, rejectWithValue, getState }) => {
    try {

      const { startUt, endUt } = getState().transactions;

      const response = await extra.api.post<ITransactionCategory[]>("/categories", { startUt, endUt });

      return response.data.map(category => {
        let sum = category.sum || 0;

        if (Number(category.sum) < 0) sum = Math.abs(category.sum); 
        else sum = 0
        
        return {
          ...category,
          sum: category.sum || 0,
          budgetProgress: [sum, category.budget]
        };
      })
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиденная ошибка");
    }
  }
)