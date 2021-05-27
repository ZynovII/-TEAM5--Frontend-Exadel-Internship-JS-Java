import axios from "../axios-api";
import jwt_decode from "jwt-decode";
import { ActionTypes } from "../context/actionTypes";
import { ILogin } from "../models/ILogin";
import { IUser } from "../models/IUser";
import { useStore } from "./hooks";

export const useAuth = () => {
  const { state, dispatch } = useStore();

  const signIn = (data: ILogin) => {
    axios.post(`/employees/auth`, data).then((res) => {
      localStorage.setItem("token", res.data.token);
      const userFromBack: any = jwt_decode(res.data.token);
      const user: IUser = {
        id: userFromBack.id,
        role: userFromBack.role,
        fullName: userFromBack.fullName,
        email: userFromBack.sub,
      };
      dispatch({
        type: ActionTypes.SIGN_IN,
        payload: user,
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
