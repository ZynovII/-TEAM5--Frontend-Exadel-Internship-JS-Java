import { useContext, useEffect } from "react";
import { Context } from "../context/context";
import { ActionTypes } from "../context/actionTypes";
import {
  fakeRequestApplicants,
  fakeRequestEvents,
} from "../fakeDB/fakeRequest";

export const useStore = () => useContext(Context);

export const useEvents = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    dispatch({
      type: ActionTypes.SHOW_LOADER,
    });
    fakeRequestEvents.then((res) => {
      dispatch({
        type: ActionTypes.FETCH_EVENTS,
        payload: JSON.parse(res),
      });
    });
  }, []);

  return {
    events: state.events,
    loading: state.loading,
  };
};

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    dispatch({
      type: ActionTypes.SHOW_LOADER,
    });
    fakeRequestApplicants.then((res) => {
      dispatch({
        type: ActionTypes.FETCH_APPLICANTS,
        payload: JSON.parse(res),
      });
    });
  });

  return {
    applicants: state.applicants,
    loading: state.loading,
  };
};

export const useMoreEvents = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    dispatch({
      type: ActionTypes.SHOW_LOADER,
    });
    fakeRequestEvents.then((res) => {
      dispatch({
        type: ActionTypes.FETCH_MORE_EVENTS,
        payload: JSON.parse(res),
      });
    });
  }, []);

  return {
    events: state.events,
    loading: state.loading,
  };
};
