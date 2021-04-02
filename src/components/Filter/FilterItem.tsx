import React from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300, paddingRight: "121px", borderRadius: "18px" },
};

export interface IFilterItem {
  id: number;
  placeholder: string;
  label: string;
  options: string[];
}

export interface IFilterItemProps {
  filterItem: IFilterItem;
}

export const DropdownControlledExample: React.FC<IFilterItemProps> = (
  props
) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    if (item) {
      setSelectedKeys(
        item.selected
          ? [...selectedKeys, item.key as string]
          : selectedKeys.filter((key) => key !== item.key)
      );
    }
  };

  return (
    <Dropdown
      label={props.filterItem.label}
      selectedKeys={selectedKeys}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={onChange}
      placeholder={props.filterItem.placeholder}
      options={props.filterItem.options.valueOf()}
      styles={dropdownStyles}
    />
  );
};

export const FilterItem: React.FC<IFilterItemProps> = (props) => (
  <Dropdown
    placeholder={props.filterItem.placeholder}
    label={props.filterItem.label}
    option={props.filterItem.options}
  />
  </Dropdown>
);
