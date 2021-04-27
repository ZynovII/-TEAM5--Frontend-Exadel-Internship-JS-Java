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

export const useStore = () => useContext(Context);

export const useLoader = () => {
  const { state, dispatch } = useStore();

  const showLoader = () => dispatch({ type: ActionTypes.SHOW_LOADER });

  return {
    loading: state.loading,
    showLoader,
  };
};

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

export const useEvents = () => {
  const { state, dispatch } = useStore();

  const fetchEvents = (page, size) => {
    axios
      .get(`http://localhost:8081/api/events?page=${page}&size=${size}`)
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

  const selectEvent = (id: string | number) => {
    if (state.events[id]) {
      dispatch({
        type: ActionTypes.SELECT_EVENT,
        payload: state.events[id],
      });
    } else {
      axios.get(`http://localhost:8081/api/events/${id}`).then((res) => {
        dispatch({
          type: ActionTypes.SELECT_EVENT,
          payload: res.data,
        });
      });
    }
  };

  return {
    selectedEvent: state.selectedEvent,
    events: state.events,
    selectEvent,
    fetchEvents,
  };
};

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fetchApplicants = () => {
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

  const selectApplicant = (id: number) => {
    dispatch({
      type: ActionTypes.SELECT_APPLICANT,
      payload: state.applicants[id],
    });
  };

  return {
    selectedApplicant: state.selectedApplicant,
    applicants: state.applicants,
    selectApplicant,
    fetchApplicants,
  };
};

export const useInterviews = () => {
  const { state, dispatch } = useStore();
  const fetchInterviews = () => {
    fakeRequestInterviews.then((res) => {
      dispatch({
        type: ActionTypes.FETCH_INTERVIEWS,
        payload: JSON.parse(res),
      });
    });
  };

  const selectInterview = (id: number) => {
    dispatch({ type: ActionTypes.SELECT_INTERVIEW, id });
  };

  return {
    selectedInterview: state.selectedInterview,
    interviews: state.applicants,
    selectInterview,
    fetchInterviews,
  };
};
