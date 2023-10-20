const useLocalStorage = (key = "") => {
  const get = () => {
    localStorage.getItem(key);
  };

  const set = (value) => {
    localStorage.setItem(key, value);
  };

  const clear = () => {
    localStorage.removeItem(key);
  };

  return { get, set, clear };
};

export default useLocalStorage;
