import { ActionTypes } from "../context/actionTypes";
import { fakeRequestSignIn, fakeRequestSignOut } from "../fakeDB/fakeRequest";
import { useStore } from "./hooks";

export const useAuth = () => {
  const { state, dispatch } = useStore();

  const signIn = () => {
    fakeRequestSignIn.then((res) => {
      dispatch({
        type: ActionTypes.SIGN_IN,
        payload: JSON.parse(res).id,
      });
    });
  };

  const signOut = () => {
    fakeRequestSignOut.then((res) => {
      dispatch({
        type: ActionTypes.SIGN_OUT,
      });
    });
  };

  return {
    isAuth: state.isAuthenticated,
    currentUserId: state.currentUserID,
    signIn,
    signOut,
  };
};
