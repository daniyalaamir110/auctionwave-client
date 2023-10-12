import AppLayout from "@/components/AppLayout";
import useAuth from "@/redux/auth/useAuth";
import Auctions from "@/views/Auctions";
import Login from "@/views/Login";
import Page404 from "@/views/Page404";
import Signup from "@/views/Signup";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

const AuthRedirectRoute = () => {
  const auth = useAuth();

  if (auth.state.success) {
    return <Navigate to="/app/auctions" replace />;
  }

  return <Outlet />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRedirectRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/app/auctions" element={<Auctions />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
