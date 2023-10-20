import { useDispatch, useSelector } from "react-redux";
import * as asyncActions from "./async-actions";
import { actions } from "./slice";

const useAuth = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = (data) => {
    dispatch(asyncActions.login(data));
  };

  const verify = () => {
    dispatch(asyncActions.verify());
  };

  const refresh = () => {
    dispatch(asyncActions.refresh());
  };

  const logout = () => {
    dispatch(actions.logout());
  };

  return { state, login, verify, refresh, logout };
};

export default useAuth;
