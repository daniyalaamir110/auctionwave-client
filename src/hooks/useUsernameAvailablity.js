import useRequestStatus from "./useRequestStatus";

const useUsernameAvailability = () => {
  const requestStatus = useRequestStatus();

  const check = (username) => {
    requestStatus.setLoading(true);
    setTimeout(() => {
      requestStatus.setLoading(false);
      requestStatus.setData({
        isAvailable: username !== "daniyal.aamir8",
      });
    }, 2000);
  };

  const clear = requestStatus.reset;

  return { requestStatus, check, clear };
};

export default useUsernameAvailability;
