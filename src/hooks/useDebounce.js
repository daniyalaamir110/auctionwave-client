import useSignalEffect from "./useSignalEffect";

const useDebounce = (callback = () => {}, timer = 0, dependencyArray = []) => {
  useSignalEffect((signal) => {
    const timeout = setTimeout(() => callback(signal), timer);
    return () => {
      clearTimeout(timeout);
    };
  }, dependencyArray);
};

export default useDebounce;
