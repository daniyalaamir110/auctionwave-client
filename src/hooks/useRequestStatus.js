import { createAction, createReducer } from "@reduxjs/toolkit";
import { useReducer } from "react";

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
  builder.addCase(actions.reset, () => ({ ...initialState }));
});

/**
 * This hook manages the state of API request. It provides
 * functions to alter the state, and state variables to leverge
 * the app UI logic.
 */
const useRequestStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = (updates = {}) => {
    dispatch(actions.setState(updates));
  };

  const setLoading = (loading = initialState.loading) => {
    dispatch(actions.setLoading(loading));
  };

  const setError = (error = initialState.error) => {
    dispatch(actions.setError(error));
  };

  const setData = (data = initialState.data) => {
    dispatch(actions.setData(data));
  };

  const reset = () => {
    dispatch(actions.reset());
  };

  const { loading, error, data } = state;

  return {
    state: {
      loading,
      error,
      data,
    },
    handlers: {
      setState,
      setLoading,
      setError,
      setData,
      reset,
    },
  };
};

export default useRequestStatus;
