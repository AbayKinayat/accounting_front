import type { DateFilterType } from 'widgets/Header';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionsSchema } from "../types/ITransactionsSchema";
import { fetchTransactions } from "../services/fetchTransactions";
import { FetchTransactionsReturn } from "../types/FetchTransactionsReturn";
import { addTransaction } from "features/AddTransactionModal/model/services/addTransaction";

const initialState: ITransactionsSchema = {
  transactions: [],
  page: 1,
  limit: 10,
  total: 0,
  error: "",
  loading: false,
  isOpen: false,
  createInitialDate: undefined,
  editIsOpen: false,
  editId: undefined,
  getTransactionsWhenCreate: false,
  createdCount: 0,
  startUt: 0,
  endUt: 0,
  sortField: "date",
  sortOrder: -1,
  dateType: "year",
  isPagination: true
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
    },
    setDateType(state, action: PayloadAction<DateFilterType>) {
      state.dateType = action.payload
    },
    setIsPagination(state, action: PayloadAction<boolean>) {
      state.isPagination = action.payload;
    },
    setCreateInitialDate(state, action: PayloadAction<Date | undefined>) {
      state.createInitialDate = action.payload;
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
        (state, action: PayloadAction<FetchTransactionsReturn>) => {
          if (Array.isArray(action.payload)) {
            state.transactions = action.payload;
            state.total = 0;
            state
          } else {
            state.transactions = action.payload.data;
            state.total = action.payload.totalPage;
          }
          
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
