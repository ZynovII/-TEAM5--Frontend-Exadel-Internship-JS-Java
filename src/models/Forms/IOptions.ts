import { IDropdownOption, ITag } from "@fluentui/react";
import { ILocationFromBackEnd } from "../ILocation";

export interface IOptionsRegistration {
  locations: ILocationFromBackEnd[];
  preferredTimes: IDropdownOption[];
}
export interface IOptionsEventFilter {
  eventTypes: IDropdownOption[];
  locations: ILocationFromBackEnd[];
  techTags?: ITag[];
  techsNewEvent?:IDropdownOption[]
}
export interface IOptionsCandidatesFilter {
    eventName: IDropdownOption[],
    primaryTech: IDropdownOption[],
    interviewProсcess: IDropdownOption[],
    countryName: IDropdownOption[],
    status: IDropdownOption[],
}