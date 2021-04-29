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

  const selectApplicant = (id: number) => {
    dispatch({
      type: ActionTypes.SELECT_APPLICANT,
      payload: state.applicants[id],
    });
  };
  // "city": "string",
  // "email": "string",
  // "event": "string",
  // "fullName": "string",
  // "phone": "string",
  // "preferredTime": "FROM_FOUR_TO_SIX",
  // "primaryTech": "string",
  // "skype": "string",
  // "summary": "string"

  const createCandidate = (candidat: IApplicant) => {
    console.log(candidat);
    const candidateForBackEnd = {
      city: candidat.city,
      email: candidat.email,
      event: candidat.eventName,
      fullName: candidat.fullName,
      phone: candidat.phoneNumber,
      preferredTime: candidat.preferredTime,
      primaryTech: candidat.technology,
      skype: candidat.skype,
      summary: candidat.summary,
    };

    axios
      .post(`${URL}/api/candidates`, candidateForBackEnd, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
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
