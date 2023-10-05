import { useState } from "react";

const useRequestStatus = ({
  initialLoading = false,
  initialError = null,
  initialData = null,
} = {}) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(initialError);
  const [data, setData] = useState(initialData);

  const reset = () => {
    setLoading(initialLoading);
    setError(initialError);
    setData(initialData);
  };

  return {
    loading,
    error,
    data,
    setLoading,
    setError,
    setData,
    reset,
  };
};

export default useRequestStatus;
