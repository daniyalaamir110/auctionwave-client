import { useEffect } from "react";

const useDebounce = (callback = () => {}, timer = 0, dependencyArray) => {
  useEffect(() => {
    const timeout = setTimeout(callback, timer);
    return () => {
      clearTimeout(timeout);
    };
  }, dependencyArray);
};

export default useDebounce;
