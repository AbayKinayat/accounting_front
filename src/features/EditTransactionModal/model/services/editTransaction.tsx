import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";
import { ITransaction, ITransactionCreate, fetchTransactions } from "entities/Transaction";

export const editTransaction = createAsyncThunk<
  ITransaction,
  ITransactionCreate,
  ThunkConfig<string>
>(
  "transactions/editTransaction",
  async (data, { extra, rejectWithValue, dispatch, getState }) => {
    try {
      const transactions = getState().transactions;
      const response = await extra.api.put<ITransaction>(`/transactions/${transactions.editId}`, data);

      dispatch(fetchTransactions());

      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиленная ошибка");
    }
  }
)