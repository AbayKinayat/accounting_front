import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { ITransaction, ITransactionCreate, fetchTransactions } from "entities/Transaction";

export const addTransaction = createAsyncThunk<
  ITransaction,
  ITransactionCreate,
  ThunkConfig<string>
>(
  "transactions/addTransaction",
  async (data, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<ITransaction>("/transactions/create", data);

      dispatch(fetchTransactions({ sortField: "date", sortOrder: 1 }));

      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиленная ошибка");
    }
  }
)