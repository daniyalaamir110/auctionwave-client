import api from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/**
 * Thunk to handle user login.
 */
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Call API to login user
      const res = await api.auth.login({ username, password });
      api.handleError(res);

      // Extract access and refresh tokens from response
      const { access, refresh } = res.data;

      // Store tokens in localStorage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // Fetch user information after successful login
      const meRes = await api.users.me();
      api.handleError(meRes);

      // Display success message
      toast.success("Logged in successfully");

      // Return user data
      return fulfillWithValue(meRes.data);
    } catch (err) {
      // Handle error and display error message
      const message = api.getErrorMessage(err);
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk to refresh the access token.
 */
export const refresh = createAsyncThunk(
  "auth/refresh",
  async (data, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refresh");

    if (refreshToken) {
      try {
        // Call API to refresh the access token
        const res = await api.auth.refresh(refreshToken, data.signal);
        api.handleError(res);

        // Update the access token in localStorage
        const { access } = res.data;
        localStorage.setItem("access", access);
      } catch (err) {
        // Handle refresh error and display error message
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        const message = api.getErrorMessage(err);
        toast.error(message);
        return rejectWithValue(message);
      }
    } else {
      return rejectWithValue("No refresh token found");
    }
  }
);

/**
 * Thunk to verify the access token and fetch user information.
 */
export const verify = createAsyncThunk(
  "auth/verify",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        // Verify access token
        const res = await api.auth.verify({ token });
        api.handleError(res);

        // Fetch user information
        const meRes = await api.users.me();
        api.handleError(meRes);

        // Display welcome back message
        toast.success("Welcome back");

        // Return user data
        return fulfillWithValue(meRes.data);
      } catch (err) {
        // Handle verification error and display error message
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        const message = api.getErrorMessage(err);
        toast.error(message);
        return rejectWithValue(message);
      }
    } else {
      return rejectWithValue("No access token found");
    }
  }
);
