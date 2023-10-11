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
