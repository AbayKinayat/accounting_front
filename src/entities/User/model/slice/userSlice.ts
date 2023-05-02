import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IUserSchema } from "../types/IUserSchema";
import { IUser } from "../types/IUser";
import { authByUsername } from "../services/authByUsername";
import { registerByUsername } from "../services/regiterByUsername";
import { refreshUser } from "../services/refreshUser";

const initialState: IUserSchema = {
  user: null,
  loading: false,
  error: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    }
  },
  extraReducers: builder => builder
    .addCase(
      authByUsername.pending,
      (state) => {
        state.loading = true;
        state.error = "";
      }
    )
    .addCase(
      authByUsername.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = ""; 
      }
    )
    .addCase(
      authByUsername.rejected,
      (state, action) => {
        state.error = action.payload || "";
        state.loading = false;
      }
    )
    .addCase(
      registerByUsername.pending,
      (state, action) => {
        state.loading = true;
      }
    )
    .addCase(
      registerByUsername.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = ""; 
      }
    )
    .addCase(
      registerByUsername.rejected,
      (state, action) => {
        state.error = action.payload || "";
        state.loading = false;
      }
    )
    .addCase(
      refreshUser.pending,
      (state) => {
        state.loading = true;
      }
    )
    .addCase(
      refreshUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.error = "";
        state.loading = false;
      }
    )
    .addCase(
      refreshUser.rejected,
      (state, action) => {
        state.error = action.payload || "";
        state.loading = false;
      }
    )
})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;