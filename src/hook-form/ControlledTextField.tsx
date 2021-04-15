import React from "react";
import { Controller } from "react-hook-form";
import {
  ITextFieldProps,
  TextField,
  Dropdown,
  IDropdownProps,
  TagPicker,
  ITagPickerProps,
  IBasePickerSuggestionsProps,
} from "@fluentui/react";
import { HookFormProps } from "./HookFormProps";

export const ControlledTextField: React.FC<HookFormProps & ITextFieldProps> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field: { onChange, onBlur, value, name: fieldName } }) => (
        <TextField
          {...props}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          name={fieldName}
          errorMessage={
            props.errors[fieldName] && props.errors[fieldName].message
          }
        />
      )}
    />
  );
};

export const ControlledDropdown: React.FC<HookFormProps & IDropdownProps> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={{ key: null }}
      render={({ field: { onChange } }) => (
        <Dropdown {...props} onChanged={onChange} />
      )}
    />
  );
};

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested tags",
  noResultsFoundText: "No tags found",
};
export const ControlledTagPicker: React.FC<HookFormProps & ITagPickerProps> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange } }) => (
        <TagPicker
          {...props}
          onChange={onChange}
          removeButtonAriaLabel="Remove"
          pickerSuggestionsProps={pickerSuggestionsProps}
        />
      )}
    />
  );
};
