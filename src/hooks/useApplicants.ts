import axios from "axios";
import { ActionTypes } from "../context/actionTypes";
import { useStore } from "./hooks";

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
