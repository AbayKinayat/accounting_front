import { fetchTransactionCategories } from '../services/fetchTransactionCategories';
import { ITransactionCategory } from '../types/ITransactionCategory';
import { ITransactionCategorySchema } from '../types/ITransactionCategorySchema';
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: ITransactionCategorySchema = {
  categories: []
}

const transactionCategorySlice = createSlice({
  name: "transactionCategory",
  initialState,
  reducers: {},
  extraReducers: builder => builder
  .addCase(
    fetchTransactionCategories.fulfilled,
    (state, action: PayloadAction<ITransactionCategory[]>) => {
      state.categories = action.payload;
    }
  )
})

export const { actions: transactionCategoryActions, reducer: transactionCategoryReducer } = transactionCategorySlice;