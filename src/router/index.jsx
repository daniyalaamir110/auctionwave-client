import AppLayout from "@/components/AppLayout";
import useAuth from "@/redux/auth/useAuth";
import AuctionPage from "@/views/AuctionPage";
import Auctions from "@/views/Auctions";
import BidsPage from "@/views/BidsPage";
import Categories from "@/views/Categories";
import CreateAuction from "@/views/CreateAuction";
import Dashbaord from "@/views/Dashboard";
import HomePage from "@/views/HomePage";
import Login from "@/views/Login";
import MyAuctions from "@/views/MyAuctions";
import Page403 from "@/views/Page403";
import Page404 from "@/views/Page404";
import SettingsPage from "@/views/SettingsPage";
import Signup from "@/views/Signup";
import UserPage from "@/views/UserPage";
import UsersPage from "@/views/UsersPage";
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

const ProtectedRoute = () => {
  const auth = useAuth();

  if (!auth.state.success) {
    return <Page403 />;
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
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashbaord />} />
            </Route>
            <Route path="categories" element={<Categories />} />
            <Route path="auctions">
              <Route index element={<Auctions />} />
              <Route element={<ProtectedRoute />}>
                <Route path="create" element={<CreateAuction />} />
              </Route>
              <Route path="my" element={<ProtectedRoute />}>
                <Route index element={<MyAuctions />} />
              </Route>
              <Route path=":id" element={<AuctionPage />} />
            </Route>
            <Route path="users">
              <Route index element={<UsersPage />} />
              <Route path=":id" element={<UserPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="bids" element={<BidsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
