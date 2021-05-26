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

  const selectInterview = (id: ID) => {
    axios.get(`/interviews/${id}`).then((res) => {
      dispatch({ type: ActionTypes.SELECT_INTERVIEW, payload: res.data });
    });
  };

  const getRoles = async () => {
    const response = await axios.get("/employees/roles");
    return response.data;
  };

  const getInterviewers = () => {
    axios.get("/employees/interviewers/list/").then((res) => {
      dispatch({ type: ActionTypes.FETCH_INTERVIEWERS, payload: res.data });
    });
  };

  const createInterviews = async (
    candidate: string,
    employee: string,
    startTime: Date
  ) => {
    const interview = {
      candidate: candidate,
      employee: employee,
      startTime: startTime,
    };
    await axios.post("/interviews/", interview)
  };

  const checkTimeSlot = async (id: string) => {
    const response = await axios.get(`/timeslots/employee/${id}`);
    return response.data;
  };

  const createTimeSlot = async (
    id: string,
    startTime: string,
    endTime: string
  ) => {
    const timeSlot = {
      startTime: +startTime.slice(0, 2),
      endTime: +endTime.slice(0, 2),
    };
    await axios.post(`timeslots/employee/${id}/add`, timeSlot);
  };

  const editFeedback = async (id: ID, feedback: string) => {
    const res = await axios.put(`interviews/${id}/feedback/edit`, feedback);
    return res.data;
  };

  return {
    selectedInterview: state.selectedInterview,
    interviews: state.interviews,
    interviewers: state.interviewers,
    selectInterview,
    fetchInterviews,
    getRoles,
    getInterviewers,
    createInterviews,
    checkTimeSlot,
    createTimeSlot,
    editFeedback,
  };
};
