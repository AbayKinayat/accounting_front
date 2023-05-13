import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITransactionCreate } from "../types/ITransactionCreate";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { ITransaction } from "entities/Transaction";

export const addTransaction = createAsyncThunk<
  ITransaction,
  ITransactionCreate,
  ThunkConfig<string>
>(
  "transactions/addTransaction",
  async (data, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.post<ITransaction>("/transactions/create", data);
      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиленная ошибка");
    }
  }
)