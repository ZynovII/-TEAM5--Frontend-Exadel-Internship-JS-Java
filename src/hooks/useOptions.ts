import { IDropdownOption, ITag } from "@fluentui/react";
import axios from "../axios-api";
import { ILocationFromBackEnd } from "../models/ILocation";
import {
  acceptStatusReformer,
  eventTypeReformer,
  interviewStatusReformer,
  preferredTimeReformer,
} from "../utils/stringReformers";

export const useOptions = () => {
  const fetchLocation = async () => {
    const response = await axios.get(`/locations/`);
    const locationOptions: ILocationFromBackEnd[] = response.data;
    return locationOptions;
  };
  const fetchTechnology = async () => {
    const response = await axios.get(`/techs`);
    const techOptions: ITag[] = response.data.map((el) => ({
      key: el.toLowerCase(),
      text: el,
      name: el,
    }));
    return techOptions;
  };
  const fetchInterviewStatuses = async () => {
    const response = await axios.get(
      `/candidates/interview-statuses`
    );
    const interviewStatusesOptions: IDropdownOption[] = response.data.map(
      (el) => ({
        key: el,
        text: interviewStatusReformer(el),
      })
    );
    return interviewStatusesOptions;
  };
  const fetchStatuses = async () => {
    const response = await axios.get(`/candidates/statuses`);
    const statusesOptions: IDropdownOption[] = response.data.map((el) => ({
      key: el,
      text: acceptStatusReformer(el),
    }));
    console.log("Status", statusesOptions);
    return statusesOptions;
  };
  const fetchPreferredTime = async () => {
    const response = await axios.get(`/candidates/preferred-times`);
    const preferredTimesOptions: IDropdownOption[] = response.data.map(
      (el) => ({
        key: el,
        text: preferredTimeReformer(el),
      })
    );
    return preferredTimesOptions;
  };
  const fetchEventTypes = async () => {
    const response = await axios.get(`/events/types`);
    const eventTypesOptions: IDropdownOption[] = response.data.map((el) => ({
      key: el,
      text: eventTypeReformer(el),
    }));
    return eventTypesOptions;
  };

  const fetchTechs = async () => {
    const response = await axios.get(`/techs`);
    const techsNewEventOptions: IDropdownOption[] = response.data.map((el) => ({
      key: el,
      text: el,
    }));
    return techsNewEventOptions;
  }

  return {
    fetchTechnology,
    fetchEventTypes,
    fetchLocation,
    fetchInterviewStatuses,
    fetchStatuses,
    fetchPreferredTime,
    fetchTechs
  };
};
