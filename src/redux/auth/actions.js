import api from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.auth.login({ username, password });
      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    } catch (error) {
      const message = error.response?.data?.detail || "Something went wrong";
      rejectWithValue(message);
    }
  }
);
