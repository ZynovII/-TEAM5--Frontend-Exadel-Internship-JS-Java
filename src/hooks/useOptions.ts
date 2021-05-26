import { IDropdownOption, ITag } from "@fluentui/react";
import axios from "../axios-api";
import { ILocationFromBackEnd } from "../models/ILocation";
import {
  acceptStatusReformer,
  eventTypeReformer,
  interviewStatusReformer,
  preferredTimeReformer,
} from "../utils/stringReformers";
import { toDropdownOptions } from "../utils/toDropdownOptions";
import { toTagsOptions } from "../utils/toTagsOptions";

export const useOptions = () => {
  const fetchEventFilters = async () => {
    const res = await axios.get("/events/getInfoForFilters");
    return res.data;
  };

  const fetchLocation = async () => {
    const response = await axios.get(`/locations/`);
    const locationOptions: ILocationFromBackEnd[] = response.data;
    return locationOptions;
  };
  const fetchTechnology = async () => {
    const response = await axios.get(`/techs`);
    const techOptions: ITag[] = toTagsOptions(response.data);
    return techOptions;
  };
  const fetchInterviewStatuses = async () => {
    const response = await axios.get(`/candidates/interview-statuses`);
    const interviewStatusesOptions: IDropdownOption[] = toDropdownOptions(
      response.data,
      interviewStatusReformer
    );
    return interviewStatusesOptions;
  };
  const fetchStatuses = async () => {
    const response = await axios.get(`/candidates/statuses`);
    const statusesOptions: IDropdownOption[] = toDropdownOptions(
      response.data,
      acceptStatusReformer
    );
    console.log("Status", statusesOptions);
    return statusesOptions;
  };
  const fetchPreferredTime = async () => {
    const response = await axios.get(`/candidates/preferred-times`);
    const preferredTimesOptions: IDropdownOption[] = toDropdownOptions(
      response.data,
      preferredTimeReformer
    );
    return preferredTimesOptions;
  };
  const fetchEventTypes = async () => {
    const response = await axios.get(`/events/types`);
    const eventTypesOptions: IDropdownOption[] = toDropdownOptions(
      response.data,
      eventTypeReformer
    );
    return eventTypesOptions;
  };

  const fetchTechs = async () => {
    const response = await axios.get(`/techs`);
    const techsNewEventOptions: IDropdownOption[] = toDropdownOptions(
      response.data
    );
    return techsNewEventOptions;
  };

  return {
    fetchEventFilters,
    fetchTechnology,
    fetchEventTypes,
    fetchLocation,
    fetchInterviewStatuses,
    fetchStatuses,
    fetchPreferredTime,
    fetchTechs,
  };
};
