import api from "@/services/api";
import useRequestStatus from "./useRequestStatus";

const useLoadUsernames = () => {
  const loadUsernamesStatus = useRequestStatus();

  const load = (firstName = "", lastName = "", signal) => {
    loadUsernamesStatus.handlers.reset();
    loadUsernamesStatus.handlers.setLoading(true);
    api.users
      .getUsernameSuggestions({ firstName, lastName }, signal)
      .then((res) => {
        loadUsernamesStatus.handlers.setData(res.data);
        loadUsernamesStatus.handlers.setLoading(false);
      })
      .catch((err) => {
        if (!api.isAborted(err)) {
          const message = api.getErrorMessage(err);
          loadUsernamesStatus.handlers.setError(message);
          loadUsernamesStatus.handlers.setLoading(false);
        }
      });
  };

  const clear = loadUsernamesStatus.handlers.reset;

  return { status: loadUsernamesStatus.state, load, clear };
};

export default useLoadUsernames;
