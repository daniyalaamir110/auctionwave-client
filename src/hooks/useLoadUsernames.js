import api from "@/services/api";
import useRequestStatus from "./useRequestStatus";

const useLoadUsernames = () => {
  const requestStatus = useRequestStatus();

  const load = (firstName = "", lastName = "") => {
    requestStatus.reset();
    requestStatus.setLoading(true);
    api.users
      .getUsernameSuggestions({ firstName, lastName })
      .then((res) => {
        requestStatus.setData(res.data);
      })
      .catch((err) => {
        requestStatus.setError("Couldn't fetch suggestions");
      })
      .finally(() => {
        requestStatus.setLoading(false);
      });
  };

  const clear = requestStatus.reset;

  return { requestStatus, load, clear };
};

export default useLoadUsernames;
