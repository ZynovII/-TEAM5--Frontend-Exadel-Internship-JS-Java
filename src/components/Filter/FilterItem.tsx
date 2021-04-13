import React from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib";
import {IFilterDropdownItem,IFilterDropdownItemProps} from "./Models"


const dropdownStyles: Partial<IDropdownStyles> = { 
  dropdown: {
    width: 300
  },
  root:{
    margin:"0 2px"
  }
};

export const DropdownControlledExample: React.FC<IFilterDropdownItemProps> = (props) => {
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
