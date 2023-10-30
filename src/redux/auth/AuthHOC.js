import AppLoader from "@/components/AppLoader";
import { useCallback, useEffect } from "react";
import useAuth from "./useAuth";

const AuthHOC = ({ children }) => {
  const auth = useAuth();

  const refreshCallback = useCallback(() => {
    auth.refresh();
  }, [auth.refresh]);

  useEffect(() => {
    let refreshInterval;

    if (auth.state.success) {
      refreshCallback();

      refreshInterval = setInterval(refreshCallback, 15 * 60 * 1000);
    } else {
      clearInterval(refreshInterval);
    }

    return () => {
      clearInterval(refreshInterval);
    };
  }, [auth.state.success, refreshCallback]);

  if (auth.state.verifying) {
    return <AppLoader />;
  }
  return children;
};

export default AuthHOC;
