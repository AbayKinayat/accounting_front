import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "shared/types/ThunkConfig";
import {  fetchTransactions } from "entities/Transaction";

export const removeTransaction = createAsyncThunk<
  void,
  number,
  ThunkConfig<string>
>(
  "transactions/removeTranscation",
  async (id, { extra, rejectWithValue, dispatch, getState }) => {
    try {
      const response = await extra.api.delete(`/transactions/${id}`);

      dispatch(fetchTransactions({ sortField: "date", sortOrder: 1 }));

      return response.data;
    } catch(e: any) {
      return rejectWithValue(e?.response?.data?.message || "Не предвиленная ошибка");
    }
  }
)