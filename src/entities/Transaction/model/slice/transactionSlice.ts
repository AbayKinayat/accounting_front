import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionsSchema } from "../types/ITransactionsSchema";
import { fetchTransactions } from "../services/fetchTransactions";
import { IFetchTransactionsReturn } from "../types/IFetchTransactionsReturn";

const initialState: ITransactionsSchema = {
  transactions: [],
  page: 1,
  limit: 3,
  total: 0,
  error: "",
  loading: false,
  isOpen: false
}

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    }
  },
  extraReducers(builder) {
    return builder
      .addCase(
        fetchTransactions.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        fetchTransactions.rejected,
        (state, action) => {
          state.loading = false,
            state.error = action.payload || "";
        }
      )
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<IFetchTransactionsReturn>) => {
          state.transactions = action.payload.data;
          state.total = action.payload.totalPage;
          state.loading = false;
        }
      )
  },
})

export const { actions: transactionsActions, reducer: transactionsReducer } = transactionSlice;
