import React from "react";
import { Dropdown, IDropdownStyles } from "@fluentui/react";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    width: 200,
    marginRight: 30
  },
  dropdownItemSelected: { backgroundColor: "lightblue" }
};

export interface IFilterList {
  id: number;
  placeholder: string;
  option: any;
}
export interface IApplicantListFilterProps {
  listFilter: IFilterList;
}
export const ApplicantListFilter: React.FC<IApplicantListFilterProps> = ({
  listFilter
}) => {
  return (
    <Dropdown
      placeholder={listFilter.placeholder}
      // selectedKeys={selectedKeys}
      // onChange={onChange}
      multiSelect
      options={listFilter.option}
      styles={dropdownStyles}
    />
  );
};
