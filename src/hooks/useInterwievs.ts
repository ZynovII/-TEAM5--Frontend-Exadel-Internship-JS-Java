import axiosApi from "../axios-api";
import { ActionTypes } from "../context/actionTypes";
import { ID } from "../models/Store/IStore";
import { useStore } from "./hooks";

export const useInterviews = () => {
  const { state, dispatch } = useStore();
  const fetchInterviews = (employeeId: ID) => {
    axiosApi.get(`/interviews/employee/${employeeId}`).then((res) => {
      console.log("interview", employeeId, res.data.result);
      dispatch({
        type: ActionTypes.FETCH_INTERVIEWS,
        payload: res.data.result,
      });
    });
  };

  const selectInterview = (id: number) => {
    dispatch({ type: ActionTypes.SELECT_INTERVIEW, id });
  };

  return {
    selectedInterview: state.selectedInterview,
    interviews: state.interviews,
    selectInterview,
    fetchInterviews,
  };
};
