import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { $api } from "shared/api/api";
import { userReducer } from "entities/User";
import { transactionsReducer } from "entities/Transaction";
import { StateSchema } from "./StateSchema";

const reducers = combineReducers<StateSchema>({
  user: userReducer,
  transactions: transactionsReducer
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
      }
    })
  },
})

export type AppDispatch = typeof store.dispatch