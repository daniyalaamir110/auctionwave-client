import { useEffect } from "react";

const useSignalEffect = (callback = (signal) => () => {}, dependencyArray) => {
  useEffect(() => {
    const controller = new AbortController();
    const cleanup = callback(controller.signal);
    return () => {
      controller.abort();
      if (cleanup) {
        cleanup();
      }
    };
  }, dependencyArray);
};

export default useSignalEffect;
