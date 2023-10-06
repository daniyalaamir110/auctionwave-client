import AppLayout from "@/components/AppLayout";
import Login from "@/views/Login";
import Signup from "@/views/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route element={<AppLayout />}>
            <Route path="/app/dashboard" element={() => <></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
