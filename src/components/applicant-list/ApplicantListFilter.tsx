import React from "react";
import { Dropdown, IDropdownStyles } from "@fluentui/react";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    width: "200px",
    marginRight: 15
  },
  dropdownItemSelected: { backgroundColor: "blue" }
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
