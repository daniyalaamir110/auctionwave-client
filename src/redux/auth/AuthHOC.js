import AppLoader from "@/components/AppLoader";
import { useEffect } from "react";
import useAuth from "./useAuth";

const AuthHOC = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    let refreshInterval;

    if (auth.state.success) {
      auth.refresh();

      refreshInterval = setInterval(() => {
        auth.refresh();
      }, 15 * 60 * 1000);
    } else {
      clearInterval(refreshInterval);
    }

    return () => {
      clearInterval(refreshInterval);
    };
  }, [auth.state.success]);

  if (auth.state.verifying) {
    return <AppLoader />;
  }
  return children;
};

export default AuthHOC;
