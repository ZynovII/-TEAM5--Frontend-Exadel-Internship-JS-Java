import axiosApi from "../axios-api";
import axios from "axios";
import { ActionTypes } from "../context/actionTypes";
import { IApplicant } from "../models/IApplicant";
import { useStore } from "./hooks";
import { Dispatch } from "react";

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fetchApplicants = (mounted) => {
    axiosApi
      .get(`/candidates`)
      .then((res) => {
        if (mounted) {
          dispatch({
            type: ActionTypes.FETCH_APPLICANTS,
            payload: res.data.content,
          });
        }
      })
      .catch((err) => console.log(err));
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
      axiosApi
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

  const createCandidate = (
    candidat: IApplicant,
    eventName: string,
    file?: File,
    cbOnLoad?: Dispatch<React.SetStateAction<string>>
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
    axiosApi
      .post(`/candidates`, candidateForBackEnd)
      .then((response) => response.data.id)
      .then((id) => {
        if (file) {
          const formData = new FormData();
          formData.append("file", file, file.name);
          axiosApi.post(`/candidates/${id}/cv/upload`, formData);
        }
        cbOnLoad(
          "Your application has been successfully sent. Our specialist will connect with you soon."
        );
      })
      .catch((err) => {
        cbOnLoad(err);
        console.log(err);
      });
  };

  const setStatus = async (path) => {
    const response = await axiosApi.put(`/candidates/${path}`);
    return response.data.status;
  };
  const cvDownload = async (id, name, tech) => {
    const response = await axiosApi
      .get(`${URL}/api/candidates/${id}/cv/exists`)
      .then((res) => {
        if (!res.data) {
          return true;
        }
        axios
          .create({
            responseType: "blob",
            headers: {
              "Content-Type": "application/pdf",
            },
          })
          .get(`${URL}/api/candidates/${id}/cv/download`)
          .then((res) => {
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
