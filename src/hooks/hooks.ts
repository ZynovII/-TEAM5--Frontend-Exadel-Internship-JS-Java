import { useContext } from "react";
import axios from "axios";
import { Context } from "../context/context";
import { ActionTypes } from "../context/actionTypes";
import {
  fakeRequestApplicants,
  fakeRequestEvents,
  fakeRequestInterviews,
  fakeRequestSignIn,
  fakeRequestSignOut,
} from "../fakeDB/fakeRequest";
import { IApplicant } from "../models/IApplicant";

const showLoader = (dispatch) => dispatch({ type: ActionTypes.SHOW_LOADER });
export const useStore = () => useContext(Context);

export const useEvents = () => {
  const { state, dispatch } = useStore();

  const fechEvents = () => {
    showLoader(dispatch);
    axios
      .get("http://localhost:8081/api/events?pageNumber=1&pageSize=2")
      .then((res) => {
        dispatch({
          type: ActionTypes.FETCH_EVENTS,
          payload: res.data.content,
        });
      })
      .catch((err) => console.log(err));
    // fakeRequestEvents.then((res) => {
    //   dispatch({
    //     type: ActionTypes.FETCH_EVENTS,
    //     payload: JSON.parse(res),
    //   });
    // });
  };

  const selectEvent = (id: string) => {
    dispatch({ type: ActionTypes.SELECT_EVENT, id });
  };

  return {
    selectedEventId: state.selectedEventId,
    events: state.events,
    loading: state.loading,
    selectEvent,
    fechEvents,
  };
};

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fechApplicants = () => {
    showLoader(dispatch);
    axios
      .get("http://localhost:8081/api/candidates")
      .then((res) => {
        dispatch({
          type: ActionTypes.FETCH_APPLICANTS,
          payload: res.data.content,
        });
      })
      .catch((err) => console.log(err));
    // fakeRequestApplicants.then((res) => {
    //   dispatch({
    //     type: ActionTypes.FETCH_APPLICANTS,
    //     payload: JSON.parse(res),
    //   });
    // });
  };

  const selectApplicant = (id: string) => {
    dispatch({ type: ActionTypes.SELECT_APPLICANT, id });
  };

  return {
    selectedApplicantsId: state.selectedApplicantId,
    applicants: state.applicants,
    loading: state.loading,
    selectApplicant,
    fechApplicants,
  };
};

export const useInterviews = () => {
  const { state, dispatch } = useStore();
  const fetchInterviews = () => {
    showLoader(dispatch);
    fakeRequestInterviews.then((res) => {
      dispatch({
        type: ActionTypes.FETCH_INTERVIEWS,
        payload: JSON.parse(res),
      });
    });
  };

  const selectInterview = (id: string) => {
    dispatch({ type: ActionTypes.SELECT_INTERVIEW, id });
  };

  return {
    selectedInterviewId: state.selectedInterviewId,
    interviews: state.applicants,
    loading: state.loading,
    selectInterview,
    fetchInterviews,
  };
};

export const useAuth = () => {
  const { state, dispatch } = useStore();

  const signIn = () => {
    showLoader(dispatch);
    fakeRequestSignIn.then((res) => {
      dispatch({
        type: ActionTypes.SIGN_IN,
        payload: JSON.parse(res).id,
      });
    });
  };

  const signOut = () => {
    showLoader(dispatch);
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
