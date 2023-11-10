import { useDispatch, useSelector } from "react-redux";
import * as asyncActions from "./async-actions";
import { actions } from "./slice";
import { useMemo, useCallback } from "react";

const useAuth = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = useCallback(
    (data) => {
      dispatch(asyncActions.login(data));
    },
    [dispatch]
  );

  const verify = useCallback(() => {
    dispatch(asyncActions.verify());
  }, [dispatch]);

  const refresh = useCallback(
    (signal) => {
      dispatch(asyncActions.refresh(signal));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(actions.logout());
  }, [dispatch]);

  const updateUser = useCallback(
    (user) => {
      dispatch(actions.updateUser(user));
    },
    [dispatch]
  );

  return useMemo(
    () => ({ state, login, verify, refresh, logout, updateUser }),
    [state, login, verify, refresh, logout, updateUser]
  );
};

export default useAuth;
