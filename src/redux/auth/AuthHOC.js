import AppLoader from "@/components/AppLoader";
import useSignalEffect from "@/hooks/useSignalEffect";
import useAuth from "./useAuth";

const AuthHOC = ({ children }) => {
  const auth = useAuth();

  useSignalEffect(
    (signal) => {
      let refreshInterval;

      if (auth.state.success) {
        auth.refresh(signal);

        refreshInterval = setInterval(
          () => auth.refresh(signal),
          15 * 60 * 1000
        );
      } else {
        clearInterval(refreshInterval);
      }

      return () => {
        clearInterval(refreshInterval);
      };
    },
    [auth.state.success]
  );

  if (auth.state.verifying) {
    return <AppLoader />;
  }
  return children;
};

export default AuthHOC;
