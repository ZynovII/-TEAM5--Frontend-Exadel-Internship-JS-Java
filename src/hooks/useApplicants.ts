import axios from "axios";
import { ActionTypes } from "../context/actionTypes";
import { IApplicant } from "../models/IApplicant";
import { URL, useStore } from "./hooks";

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fetchApplicants = () => {
    axios
      .get(`${URL}/api/candidates`)
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
    if (state.events[id]) {
      dispatch({
        type: ActionTypes.SELECT_APPLICANT,
        payload: state.applicants[id],
      });
    } else if (id === null) {
      dispatch({
        type: ActionTypes.SELECT_APPLICANT,
        payload: null,
      });
    } else {
      axios.get(`${URL}/api/candidates/${id}`).then((res) => {
        dispatch({
          type: ActionTypes.SELECT_APPLICANT,
          payload: res.data,
        });
      });
    }
  };

  const createCandidate = (
    candidat: IApplicant,
    eventName: string,
    file: File
  ) => {
    const candidateForBackEnd = {
      city: candidat.city[0],
      email: candidat.email,
      event: eventName,
      fullName: candidat.fullName,
      phone: candidat.phoneNumber,
      preferredTime: candidat.preferredTime[0],
      primaryTech: candidat.technology[0],
      skype: candidat.skype,
      summary: candidat.summary,
    };
    axios
      .post(`${URL}/api/candidates`, candidateForBackEnd)
      .then((response) => response.data.id)
      .then((id) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        axios.post(
          `http://localhost:8081/api/candidates/${id}/cv/upload`,
          formData
        );
      });
  };

  return {
    selectedApplicant: state.selectedApplicant,
    applicants: state.applicants,
    selectApplicant,
    fetchApplicants,
    createCandidate,
  };
};
