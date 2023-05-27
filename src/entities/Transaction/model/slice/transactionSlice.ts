import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionsSchema } from "../types/ITransactionsSchema";
import { fetchTransactions } from "../services/fetchTransactions";
import { IFetchTransactionsReturn } from "../types/IFetchTransactionsReturn";
import { addTransaction } from "features/AddTransactionModal/model/services/addTransaction";
import { ITransaction } from "../types/ITransaction";

const initialState: ITransactionsSchema = {
  transactions: [],
  page: 1,
  limit: 10,
  total: 0,
  error: "",
  loading: false,
  isOpen: false,
  editIsOpen: false,
  editId: undefined,
  getTransactionsWhenCreate: false,
  createdCount: 0,
  startUt: 0,
  endUt: 0,
  sortField: "date",
  sortOrder: -1
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
    },
    setEditIsOpen(state, action: PayloadAction<boolean>) {
      state.editIsOpen = action.payload;
    },
    setEditId(state, action: PayloadAction<number>) {
      state.editId = action.payload;
    },
    setGetTransactionsWhenCreate(state, action: PayloadAction<boolean>) {
      state.getTransactionsWhenCreate = action.payload;
    },
    setStartUt(state, action: PayloadAction<number>) {
      state.startUt = action.payload;
    },
    setEndUt(state, action: PayloadAction<number>) {
      state.endUt = action.payload;
    },
    setSortOrder(state, action: PayloadAction<number>) {
      state.sortOrder = action.payload;
    },
    setSortField(state, action: PayloadAction<string>) {
      state.sortField = action.payload;
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
      .addCase(
        addTransaction.fulfilled,
        (state) => {
          state.createdCount++;
        }
      )
  },
})

export const { actions: transactionsActions, reducer: transactionsReducer } = transactionSlice;
