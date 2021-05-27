import axios from "../axios-api";
import { ActionTypes } from "../context/actionTypes";
import { ILogin } from "../models/ILogin";
import { tokenToUser } from "../utils/tokenToUser";
import { useStore } from "./hooks";

export const useAuth = () => {
  const { state, dispatch } = useStore();

  const signIn = (data: ILogin) => {
    axios.post(`/employees/auth`, data).then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: ActionTypes.SIGN_IN,
        payload: tokenToUser(res.data.token),
      });
    });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    dispatch({
      type: ActionTypes.SIGN_OUT,
    });
  };

  return {
    isAuth: state.isAuthenticated,
    currentUser: state.currentUser,
    signIn,
    signOut,
  };
};
