import { useReducer } from "react";
import useRequestStatus from "./useRequestStatus";

const initialQuery = {
  category: null,
  search: null,
  creator: null,
  minPrice: null,
  maxPrice: null,
};

const actions = {
  reset: (state) => {
    state = initialQuery;
  },
  setCategory: (state, { payload }) => {
    state.category = payload;
  },
  setSearch: (state, { payload }) => {
    state.search = payload;
  },
  setCreator: (state, { payload }) => {
    state.creator = payload;
  },
  setMinPrice: (state, { payload }) => {
    state.minPrice = payload;
  },
  setMaxPrice: (state, { payload }) => {
    state.maxPrice = payload;
  },
  setState: (state, { payload }) => {
    state = { ...state, ...payload };
  },
};

const useAuctions = () => {
  const requestStatus = useRequestStatus();

  //   const [query, dispatch] = useReducer(initialQuery);
};

export default useAuctions;
