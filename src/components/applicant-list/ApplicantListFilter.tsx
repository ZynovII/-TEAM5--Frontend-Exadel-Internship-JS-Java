import React from "react";
import { Dropdown, IDropdownStyles, IDropdownOption } from "@fluentui/react";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    minWidth: 200,
    marginBottom: '20px',
    marginRight: '20px'
  },
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
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      setSelectedKeys(
        item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key),
      );
    }
  };

  return (
    <Dropdown
      placeholder={listFilter.placeholder}
      selectedKeys={selectedKeys}
      onChange={onChange}
      multiSelect
      options={listFilter.option}
      styles={dropdownStyles}
    />
  );
};
