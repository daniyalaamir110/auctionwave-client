import api from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.auth.login({ username, password });
      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      toast("Logged in successfully", { type: "success" });
    } catch (error) {
      const message = error.response?.data?.detail || "Something went wrong";
      toast(message, { type: "error" });
      rejectWithValue(message);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (data, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
      try {
        const res = await api.auth.refresh({ refresh: refreshToken });
        const { access } = res.data;
        localStorage.setItem("access", access);
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        const message = error.response?.data?.detail || "Something went wrong";
        toast(message, { type: "error" });
        rejectWithValue(message);
      }
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        await api.auth.verify({ token });
        toast("Welcome back", { type: "success" });
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        const message = error.response?.data?.detail || "Something went wrong";
        toast(message, { type: "error" });
        rejectWithValue(message);
      }
    }
  }
);
