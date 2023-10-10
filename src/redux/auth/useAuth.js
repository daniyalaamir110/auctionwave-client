import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";

const useAuth = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = (data) => {
    dispatch(actions.login(data));
  };

  return { state, login };
};

export default useAuth;
