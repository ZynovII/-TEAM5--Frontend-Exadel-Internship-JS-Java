import React from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib";


const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300,margin:"0 10px"} };

export interface IFilterItem{
    id: number;
    placeholder: string;
    label: string;
    options: IDropdownOption[];
}

export interface IFilterItemProps {
  filterItem: IFilterItem;
}

export const DropdownControlledExample: React.FC<IFilterItemProps> = (props) => {
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();

  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedItem(item);
  };

  
    return (
      <Dropdown
        label={props.filterItem.label}
        selectedKey={selectedItem ? selectedItem.key : undefined}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        placeholder={props.filterItem.placeholder}
        options={props.filterItem.options}
        styles={dropdownStyles}
      />
    );
  };
