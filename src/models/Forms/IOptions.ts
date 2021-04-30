import { IDropdownOption } from "@fluentui/react";
import { ILocationFromBackEnd } from "../ILocation";

export interface IOptionsRegistration {
  locations: ILocationFromBackEnd[];
  preferredTimes: IDropdownOption[];
}
