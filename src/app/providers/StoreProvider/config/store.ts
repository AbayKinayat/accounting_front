import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { $api } from "shared/api/api";
import { userReducer } from "entities/User";
import { transactionsReducer } from "entities/Transaction";
import { StateSchema } from "./StateSchema";
import { transactionCategoryReducer } from "entities/TransactionCategory";
import { debtsReducer } from "entities/Debt";

const reducers = combineReducers<StateSchema>({
  user: userReducer,
  transactions: transactionsReducer,
  transactionCategory: transactionCategoryReducer,
  debts: debtsReducer
})

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api
        }
      },
      serializableCheck: false
    })
  },
})

export type AppDispatch = typeof store.dispatch