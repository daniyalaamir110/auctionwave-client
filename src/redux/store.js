import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import { verify } from "./auth/async-actions";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(verify());

export default store;
