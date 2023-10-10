import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions";

const initialState = {
  loading: false,
  success: false,
  error: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    /**
     * Login
     */
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
