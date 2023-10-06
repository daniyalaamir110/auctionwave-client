import useRequestStatus from "./useRequestStatus";

const useLoadUsernames = () => {
  const requestStatus = useRequestStatus();

  const load = (firstName = "", lastName = "") => {
    requestStatus.setLoading(true);
    setTimeout(() => {
      requestStatus.setLoading(false);
      requestStatus.setData(["daniyala11", "daamir12", "daniyal.aamir9"]);
    }, 2000);
  };

  const clear = requestStatus.reset;

  return { requestStatus, load, clear };
};

export default useLoadUsernames;
