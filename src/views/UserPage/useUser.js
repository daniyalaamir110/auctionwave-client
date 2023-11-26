import useRequestStatus from "@/hooks/useRequestStatus";
import useSignalEffect from "@/hooks/useSignalEffect";
import api from "@/services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useUser = () => {
  const params = useParams();
  const userStatus = useRequestStatus();

  const userId = params.id;

  useSignalEffect(
    (signal) => {
      userStatus.handlers.setLoading(true);
      api.users
        .getById(userId, signal)
        .then((res) => {
          api.handleError(res);
          const { data } = res;
          userStatus.handlers.setData(data);
          userStatus.handlers.setLoading(false);
        })
        .catch((err) => {
          if (!api.isAborted(err)) {
            const message = api.getErrorMessage(err);
            toast.error(message);
            userStatus.handlers.setError(message);
            userStatus.handlers.setLoading(false);
          }
        });
    },
    [userId]
  );

  return { status: userStatus.state };
};

export default useUser;
