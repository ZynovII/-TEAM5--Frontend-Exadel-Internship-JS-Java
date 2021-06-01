import axios from "../axios-api";
import { ActionTypes } from "../context/actionTypes";
import { ILogin } from "../models/ILogin";
import { tokenToUser } from "../utils/tokenToUser";
import { useStore } from "./hooks";

export const useAuth = () => {
  const { state, dispatch } = useStore();

  const signIn = async (data: ILogin) => {
    try {
      const res = await axios.post(`/employees/auth`, data);
      if (res.data.token !== null) {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: ActionTypes.SIGN_IN,
          payload: tokenToUser(res.data.token),
        });
        return "Success!";
      } else {
        throw new Error("Invalid credentials!");
      }
    } catch (err) {
      alert(err);
    }
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
