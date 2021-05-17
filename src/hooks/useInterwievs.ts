import { ActionTypes } from "../context/actionTypes";
import { useStore } from "./hooks";
import axios from "../axios-api";
export const useInterviews = () => {
  const { state, dispatch } = useStore();
  const fetchInterviews = () => {
    console.log("interview");
    // dispatch({
    //   type: ActionTypes.FETCH_INTERVIEWS,
    //   payload: JSON.parse(res),
    // });
  };

  const selectInterview = (id: number) => {
    dispatch({ type: ActionTypes.SELECT_INTERVIEW, id });
  };

  const getRoles = async () => {
      const response = await axios.get('/employees/roles')
      return response.data
  };

  const getInterviewers = async () => {
    axios.get('/employees/interviewers/list/').then(res => {
      dispatch({ type: ActionTypes.FETCH_INTERVIEWERS, payload: res.data});
    })
  }

  return {
    selectedInterview: state.selectedInterview,
    interviews: state.applicants,
    interviewers: state.interviewers,
    selectInterview,
    fetchInterviews,
    getRoles,
    getInterviewers,
  };
};
