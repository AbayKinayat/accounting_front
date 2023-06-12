import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { ITransaction, ITransactionCreate, fetchTransactions } from "entities/Transaction";

export const editTransaction = createAsyncThunk<
  ITransaction,
  ITransactionCreate & { id: number },
  ThunkConfig<string>
>(
  "transactions/editTransaction",
  async (data, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.put<ITransaction>(`/transactions/${data.id}`, data);

      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиленная ошибка");
    }
  }
)