import { useStore } from "./hooks";
import axios, { axiosBlob } from "../axios-api";
import { ActionTypes } from "../context/actionTypes";
import { IApplicant } from "../models/IApplicant";
import {IDropdownOption} from "@fluentui/react"
import {interviewStatusReformer} from "../utils/stringReformers"

export const useApplicants = () => {
  const { state, dispatch } = useStore();

  const fetchApplicants = async (page,size,) => {
    try {
      const res = await axios.get(`/candidates?page=${page}&size=${size}`);
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

  const getInfoForFilters = async () => {
    const response = await axios.get(`/candidates/getInfoForFilter`);
    const eventNameOptions: IDropdownOption[] = response.data.eventName.map((el) => ({
      key: el.replace(/ /g,"%20").replace('&','%26'),
      text: (el),
    }));
    const primaryTechOptions: IDropdownOption[] = response.data.primaryTech.map((el) => ({
      key: el,
      text: (el),
    }));
    const countryNameOptions: IDropdownOption[] = response.data.countryName.map((el) => ({
      key: el,
      text: (el),
    }));
    const interviewProccessOptions: IDropdownOption[] = response.data.interviewProccess.map((el) => ({
      key: el,
      text: interviewStatusReformer(el),
    }));
    const statusOptions: IDropdownOption[] = response.data.status.map((el) => ({
      key: el,
      text: (el),
    }));
   return [eventNameOptions, primaryTechOptions, countryNameOptions, interviewProccessOptions, statusOptions];
  };

  const fetchFilteredApplicants = (page,size, mounted, data ) => {
    let allFetchstr = ""
    if (data)  { let strCountryName= data.countryName?.map(el=>'countryName='+el).join("&")
    let strEventName = data.eventName?.map(el=>'eventName='+el).join("&")
    let strIntProcess = data.interviewProсcess?.map(el=>'interviewProccess='+el).join("&")
    let strPrimaryTech = data.primaryTech?.map(el=>'primaryTech='+el).join("&")
    let strStatus = data.status?.map(el=>'status='+el).join("&")
     allFetchstr = [strCountryName,strEventName, strIntProcess, strPrimaryTech, strStatus].filter(Boolean).join("&")}
    
    console.log(allFetchstr)
    axios
      .get(`/candidates/getCandidatesWithFilter?${allFetchstr}`)
      .then((res) => 
        {if (mounted) {
          console.log("gdf")
          dispatch({
            type: ActionTypes.FILTER_APPLICANTS,
            payload: res.data.result.content,
          });
        }
      }
      )
      .catch((err) => console.log(err));
    }

  return {
    selectedApplicant: state.selectedApplicant,
    applicants: state.applicants,
    selectApplicant,
    fetchApplicants,
    createCandidate,
    setStatus,
    cvDownload,
    getInfoForFilters,
    fetchFilteredApplicants
  };
};
