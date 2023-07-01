import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDebtSchema } from "../types/IDebtSchema";
import { fetchDebts } from "../services/fetchDebts";
import { IDebt } from "../types/IDebt";

const initialState: IDebtSchema = {
  loading: false,
  error: "",
  debts: []
}

export const debtSlice = createSlice(
  {
    name: "debts",
    initialState,
    reducers: {},
    extraReducers: builder => builder
      .addCase(
        fetchDebts.pending,
        (state) => {
          state.error = "";
          state.loading = true;
        }
      )
      .addCase(
        fetchDebts.fulfilled,
        (state, action: PayloadAction<IDebt[]>) => {
          state.debts = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchDebts.rejected,
        (state, action) => {
          state.error = action.payload || "";
          state.loading = false;
        }
      )
  }
)

export const { actions: debtsActions } = debtSlice;
export const { reducer: debtsReducer } = debtSlice;