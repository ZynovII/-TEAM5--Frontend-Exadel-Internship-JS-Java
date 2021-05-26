import { useStore } from "./hooks";
import axios, { axiosBlob } from "../axios-api";
import { ActionTypes } from "../context/actionTypes";
import { IApplicant } from "../models/IApplicant";
import { interviewStatusReformer } from "../utils/stringReformers"
import { ID } from "../models/Store/IStore";
import {IOptionsCandidatesFilter} from "../models/Forms/IOptions"

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fetchApplicants = async (page, size,data?) => {
    let allFetchstr = ""
    if (data) {
      let strCountryName = data.countryName?.map(el => 'countryName=' + el).join("&")
      let strEventName = data.eventName?.map(el => 'eventName=' + el).join("&")
      let strIntProcess = data.interviewProсcess?.map(el => 'interviewProccess=' + el).join("&")
      let strPrimaryTech = data.primaryTech?.map(el => 'primaryTech=' + el).join("&")
      let strStatus = data.status?.map(el => 'status=' + el).join("&")
      allFetchstr = [strCountryName, strEventName, strIntProcess, strPrimaryTech, strStatus].filter(Boolean).join("&")
    }
    try {
      const res = await axios.get(`/candidates/getCandidatesWithFilter?${allFetchstr&&(allFetchstr+"&")}page=${page}&size=${size}`);
      return () => {
        console.log(data)
        if (data){
          
          dispatch({
            type: ActionTypes.FILTER_APPLICANTS,
            payload: res.data.result.content,
          });
        }
        else {
          dispatch({
            type: ActionTypes.FETCH_APPLICANTS,
            payload: res.data.result.content,
          });
        }
        
      };
    } catch (err) {
      console.log(err);
    }
  };

  const selectApplicant = (id: ID) => {
    if (state.events[id]) {
      dispatch({
        type: ActionTypes.SELECT_APPLICANT,
        payload: state.applicants[id],
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
      return "Ooops! Something went wrong...";
    }
  };

  const editCandidate = async (
    candidate: IApplicant,
    eventName: string,
    id: ID,
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
      const res = await axios.put(`/candidates/${id}/edit`, candidateForBackEnd);
      return "Your application has been successfully sent. Our specialist will connect with you soon.";
    } catch (err) {
      console.log(err);
      return "Ooops! Something went wrong...";
    }
  }

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

  const getInfoForFilters = async () => {
    const response = await axios.get(`/candidates/getInfoForFilter`);

    const buildDropdownOptions = (data: string[]) => data.map((el) => ({ key: el, text: el }))

    const filterOptions = {
      eventName: response.data.eventName.map((el) => ({
        key: el.replace(/ /g, "%20").replace('&', '%26'),
        text: (el),
      })),
      primaryTech: buildDropdownOptions(response.data.primaryTech),
      interviewProccess: response.data.interviewProccess.map((el) => ({
        key: el,
        text: interviewStatusReformer(el),
      })),
      countryName: buildDropdownOptions(response.data.countryName),
      status: buildDropdownOptions(response.data.status)
    }

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
  };
};
