import { createAction, createReducer } from "@reduxjs/toolkit";
import { useReducer, useCallback, useMemo } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const actions = {
  setState: createAction("auctions/setState"),
  setLoading: createAction("auctions/setLoading"),
  setError: createAction("auctions/setError"),
  setData: createAction("auctions/setData"),
  reset: createAction("auctions/reset"),
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setState, (state, { payload }) => {
    return { ...state, ...payload };
  });
  builder.addCase(actions.setLoading, (state, { payload }) => {
    return { ...state, loading: payload };
  });
  builder.addCase(actions.setError, (state, { payload }) => {
    return { ...state, error: payload };
  });
  builder.addCase(actions.setData, (state, { payload }) => {
    return { ...state, data: payload };
  });
  builder.addCase(actions.reset, () => initialState);
});

const useRequestStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = useCallback(
    (updates = {}) => {
      dispatch(actions.setState(updates));
    },
    [dispatch]
  );

  const setLoading = useCallback(
    (loading = initialState.loading) => {
      dispatch(actions.setLoading(loading));
    },
    [dispatch]
  );

  const setError = useCallback(
    (error = initialState.error) => {
      dispatch(actions.setError(error));
    },
    [dispatch]
  );

  const setData = useCallback(
    (data = initialState.data) => {
      dispatch(actions.setData(data));
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch(actions.reset());
  }, [dispatch]);

  const { loading, error, data } = state;

  return useMemo(
    () => ({
      loading,
      error,
      data,
      setState,
      setLoading,
      setError,
      setData,
      reset,
    }),
    [loading, error, data, setState, setLoading, setError, setData, reset]
  );
};

export default useRequestStatus;
