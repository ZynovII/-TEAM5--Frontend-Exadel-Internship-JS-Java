import {
  IDropdownOption,
  ITag,
} from "@fluentui/react/lib";

export interface IFilterDropdownItem{
  id: string;
  key: string;
  placeholder: string;
  label: string;
  options: IDropdownOption[];
  name: string;
}

export interface IFilterData{
  tags: ITag[];
  location: IDropdownOption;
  type:IDropdownOption;
  eventType:IDropdownOption;
  tagPicker: string[];
}