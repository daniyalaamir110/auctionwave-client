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

  const refresh = (signal) => {
    dispatch(asyncActions.refresh(signal));
  };

  const logout = () => {
    dispatch(actions.logout());
  };

  const updateUser = (user) => {
    dispatch(actions.updateUser(user));
  };

  const updateProfileImage = (profileImage) => {
    dispatch(actions.updateProfileImage(profileImage));
  };

  return {
    state,
    login,
    verify,
    refresh,
    logout,
    updateUser,
    updateProfileImage,
  };
};

export default useAuth;
