import { useEffect } from "react";

/**
 * Works same as `useEffect` but gives `signal` through callback
 * parameter, to be used in case of API requests.
 * @param {(signal: AbortSignal) => () => {}} callback
 * The effect to be run, with an additional `signal` callback parameter
 * @param {*[]} dependencyArray
 * The list of dependencies
 */
const useSignalEffect = (callback, dependencyArray) => {
  useEffect(() => {
    const controller = new AbortController();
    const cleanup = callback(controller.signal) || (() => {});
    return () => {
      controller.abort();
      cleanup();
    };
    // eslint-disable-next-line
  }, dependencyArray);
};

export default useSignalEffect;
