import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";
import { toast } from "react-toastify";

const useDashboard = () => {
  const dashboardStatus = useRequestStatus();

  const get = (signal = null) => {
    dashboardStatus.handlers.reset();
    dashboardStatus.handlers.setLoading(true);
    api.dashboard
      .get(signal)
      .then((res) => {
        api.handleError(res);
        dashboardStatus.handlers.setData(res.data);
      })
      .catch((err) => {
        const message = api.getErrorMessage(err);
        toast.error(message);
        dashboardStatus.handlers.setError(message);
      })
      .finally(() => {
        dashboardStatus.handlers.setLoading(false);
      });
  };

  useSignalEffect(get, []);

  return { status: dashboardStatus.state, get };
};

export default useDashboard;
