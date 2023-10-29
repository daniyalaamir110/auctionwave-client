import api from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.auth.login({ username, password });
      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      const meRes = await api.users.me();
      toast.success("Logged in successfully");
      return fulfillWithValue(meRes.data);
    } catch (error) {
      const message = error.response?.data?.detail || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
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
        localStorage.clear();
        const message = error.response?.data?.detail || "Something went wrong";
        toast.error(message);
        return rejectWithValue(message);
      }
    } else {
      return rejectWithValue("No refresh token found");
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        await api.auth.verify({ token });
        const res = await api.users.me();
        toast.success("Welcome back");
        return fulfillWithValue(res.data);
      } catch (error) {
        localStorage.clear();
        const message = error.response?.data?.detail || "Something went wrong";
        toast.error(message);
        return rejectWithValue(message);
      }
    } else {
      return rejectWithValue("No accesss token found");
    }
  }
);
