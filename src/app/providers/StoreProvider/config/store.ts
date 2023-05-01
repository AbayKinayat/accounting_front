import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { $api } from "shared/api/api";
import { userReducer } from "entities/User";

const reducers = combineReducers({
  user: userReducer
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
export type StateSchema = ReturnType<typeof store.getState>