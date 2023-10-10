import AppLayout from "@/components/AppLayout";
import Auctions from "@/views/Auctions";
import Login from "@/views/Login";
import Page404 from "@/views/Page404";
import Signup from "@/views/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route element={<AppLayout />}>
          <Route path="/app/auctions" element={<Auctions />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
