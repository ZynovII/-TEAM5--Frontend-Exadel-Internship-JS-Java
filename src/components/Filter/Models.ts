import { IDropdownOption, ITag } from "@fluentui/react/lib";
import { EventType } from "react-hook-form";
import { EventStatus } from "../../models/IEvent";

export interface IFilterDropdownItem {
  id: string;
  key: string;
  placeholder: string;
  label: string;
  options: IDropdownOption[];
  name: string;
}

export interface IFilterToRequest {
  country: string[];
  status: EventStatus[];
  tagPicker: string[];
  eventType: EventType[];
}
