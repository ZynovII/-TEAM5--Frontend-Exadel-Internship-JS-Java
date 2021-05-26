import { useStore } from "./hooks";
import axios, { axiosBlob } from "../axios-api";
import { ActionTypes } from "../context/actionTypes";
import { IApplicant } from "../models/IApplicant";
import { interviewStatusReformer } from "../utils/stringReformers";
import { ID } from "../models/Store/IStore";
import { toDropdownOptions } from "../utils/toDropdownOptions";
import { IOptionsCandidatesFilter } from "../models/Forms/IOptions";

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fetchApplicants = async (page, size, data?) => {
    let allFetchstr = "";
    if (data) {
      let strCountryName = data.countryName
        ?.map((el) => "countryName=" + el)
        .join("&");
      let strEventName = data.eventName
        ?.map((el) => "eventName=" + el)
        .join("&");
      let strIntProcess = data.interviewProсcess
        ?.map((el) => "interviewProccess=" + el)
        .join("&");
      let strPrimaryTech = data.primaryTech
        ?.map((el) => "primaryTech=" + el)
        .join("&");
      let strStatus = data.status?.map((el) => "status=" + el).join("&");
      allFetchstr = [
        strCountryName,
        strEventName,
        strIntProcess,
        strPrimaryTech,
        strStatus,
      ]
        .filter(Boolean)
        .join("&");
    }
    try {
      const res = await axios.get(
        `/candidates/getCandidatesWithFilter?${
          allFetchstr && allFetchstr + "&"
        }page=${page}&size=${size}`
      );
      return () => {
        if (data) {
          dispatch({
            type: ActionTypes.FETCH_FILTERED_APPLICANTS,
            payload: res.data.result.content,
          });
        } else {
          dispatch({
            type: ActionTypes.FETCH_APPLICANTS,
            payload: res.data.result.content,
          });
        }
        return res.data.result.totalElements;
      };
    } catch (err) {
      console.log(err);
    }
  };

  const selectApplicant = (id: ID) => {
    axios
      .get(`/candidates/${id}`)
      .then((res) => {
        dispatch({
          type: ActionTypes.SELECT_APPLICANT,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
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
      return "Ooops! Something went wrong...";
    }
  };

  const editCandidate = async (
    candidate: IApplicant,
    eventName: string,
    id: ID
  ) => {
    const candidateForBackEnd = {
      city: candidate.city.toString(),
      email: candidate.email,
      event: eventName,
      fullName: candidate.fullName,
      phone: candidate.phoneNumber,
      preferredTime: candidate.preferredTime.toString(),
      primaryTech: candidate.technology.toString(),
      skype: candidate.skype,
      summary: candidate.summary,
    };
    try {
      const res = await axios.put(
        `/candidates/${id}/edit`,
        candidateForBackEnd
      );
      return "Your application has been successfully sent. Our specialist will connect with you soon.";
    } catch (err) {
      console.log(err);
      return "Ooops! Something went wrong...";
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
  const interviewsStatus = async (id: ID, status: string) => {
    await axios.put(`/candidates/${id}/awaiting_${status}`);
  };

  const getInfoForFilters = async () => {
    const response = await axios.get(`/candidates/getInfoForFilter`);

    const filterOptions: IOptionsCandidatesFilter = {
      eventName: toDropdownOptions(response.data.eventName),
      primaryTech: toDropdownOptions(response.data.primaryTech),
      interviewProccess: toDropdownOptions(
        response.data.interviewProccess,
        interviewStatusReformer
      ),
      countryName: toDropdownOptions(response.data.countryName),
      status: toDropdownOptions(response.data.status),
    };

    return filterOptions;
  };

  return {
    selectedApplicant: state.selectedApplicant,
    applicants: state.applicants,
    selectApplicant,
    fetchApplicants,
    createCandidate,
    setStatus,
    cvDownload,
    getInfoForFilters,
    editCandidate,
    interviewsStatus,
  };
};
