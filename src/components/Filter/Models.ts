import {
  IDropdownOption,
  ITag,
} from "@fluentui/react/lib";

export interface IFilterDropdownItem{
  id: number;
  placeholder: string;
  label: string;
  options: IDropdownOption[];
}

export interface IFilterDropdownItemProps {
  filterItem: IFilterDropdownItem;
}

export interface ITagPickerItemProps{
  label: string;
  eventTags: ITag[];
}

export interface IFilterData{
  tags: ITag[];
  location: IDropdownOption;
  type:IDropdownOption;
}