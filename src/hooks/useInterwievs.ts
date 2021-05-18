import { ActionTypes } from "../context/actionTypes";
import { ID } from "../models/Store/IStore";
import { useStore } from "./hooks";
import axios from "../axios-api";

export const useInterviews = () => {
  const { state, dispatch } = useStore();
  const fetchInterviews = (employeeId: ID) => {
    axios.get(`/interviews/employee/${employeeId}`).then((res) => {
      dispatch({
        type: ActionTypes.FETCH_INTERVIEWS,
        payload: res.data.result,
      });
    });
  };

  const selectInterview = (id: number) => {
    dispatch({ type: ActionTypes.SELECT_INTERVIEW, id });
  };

  const getRoles = async () => {
    const response = await axios.get("/employees/roles");
    return response.data;
  };

  const getInterviewers = async () => {
    axios.get("/employees/interviewers/list/").then((res) => {
      dispatch({ type: ActionTypes.FETCH_INTERVIEWERS, payload: res.data });
    });
  };

  return {
    selectedInterview: state.selectedInterview,
    interviews: state.interviews,
    interviewers: state.interviewers,
    selectInterview,
    fetchInterviews,
    getRoles,
    getInterviewers,
  };
};
