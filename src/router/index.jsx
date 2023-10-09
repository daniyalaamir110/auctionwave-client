import AppLayout from "@/components/AppLayout";
import Login from "@/views/Login";
import Products from "@/views/Products";
import Signup from "@/views/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route element={<AppLayout />}>
          <Route path="/app/products" element={<Products />} />
        </Route>
        <Route path="*" element={<Navigate to="/app/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
