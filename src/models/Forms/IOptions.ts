import { IDropdownOption, ITag } from "@fluentui/react";
import { ILocationFromBackEnd } from "../ILocation";

export interface IOptionsRegistration {
  locations: ILocationFromBackEnd[];
  preferredTimes: IDropdownOption[];
}

export interface IOptionsEventFilter {
  eventTypes: IDropdownOption[];
  locations: IDropdownOption[];
  techTags?: ITag[];
  techsNewEvent?: IDropdownOption[];
  statuses?: IDropdownOption[];
}

export interface IOptionsNewEventDropdown {
  eventTypes: IDropdownOption[];
  locations: ILocationFromBackEnd[];
  techTags?: ITag[];
  techsNewEvent?: IDropdownOption[];
  statuses?: IDropdownOption[];
}

export interface IOptionsCandidatesFilter {
    eventName: IDropdownOption[],
    primaryTech: IDropdownOption[],
    interviewProccess: IDropdownOption[],
    countryName: IDropdownOption[],
    status: IDropdownOption[],
}