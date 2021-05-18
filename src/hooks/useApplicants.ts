import { useStore } from "./hooks";

import axios, { axiosBlob } from "../axios-api";
import { ActionTypes } from "../context/actionTypes";
import { IApplicant } from "../models/IApplicant";

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`/candidates`);
      return () => {
        dispatch({
          type: ActionTypes.FETCH_APPLICANTS,
          payload: res.data.content,
        });
      };
    } catch (err) {
      console.log(err);
    }
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
      axios
        .get(`/candidates/${id}`)
        .then((res) => {
          dispatch({
            type: ActionTypes.SELECT_APPLICANT,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const createCandidate = async (
    candidat: IApplicant,
    eventName: string,
    file?: File
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
    try {
      const res = await axios.post(`/candidates`, candidateForBackEnd);
      if (file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        axios.post(`/candidates/${res.data.id}/cv/upload`, formData);
      }
      return "Your application has been successfully sent. Our specialist will connect with you soon.";
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

  const setStatus = async (path) => {
    const response = await axios.put(`/candidates/${path}`);
    return response.data.status;
  };

  const cvDownload = async (id, name, tech) => {
    const response = await axios
      .get(`/candidates/${id}/cv/exists`)
      .then((res) => {
        if (!res.data) {
          return true;
        }
        axiosBlob.get(`/candidates/${id}/cv/download`).then((res) => {
          const blob = new Blob([res.data], { type: "application/pdf" });
          const link = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = `CV ${name} ${tech}`;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        });
      })
      .catch((err) => console.log(err));
    return response;
  };

  return {
    selectedApplicant: state.selectedApplicant,
    applicants: state.applicants,
    selectApplicant,
    fetchApplicants,
    createCandidate,
    setStatus,
    cvDownload,
  };
};
