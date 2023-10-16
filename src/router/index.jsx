import AppLayout from "@/components/AppLayout";
import useAuth from "@/redux/auth/useAuth";
import Auctions from "@/views/Auctions";
import CreateAuction from "@/views/CreateAuction";
import HomePage from "@/views/HomePage";
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
    return <Navigate to="/app/dashboard" replace />;
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
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="app">
            <Route path="auctions">
              <Route index element={<Auctions />} />
              <Route path="create" element={<CreateAuction />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
