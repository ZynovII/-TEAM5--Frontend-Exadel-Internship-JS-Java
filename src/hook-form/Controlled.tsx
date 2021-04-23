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
      defaultValue={props.value}
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
      defaultValue={props.defaultSelectedKey}
      render={({field:{ onChange, name:fieldName }}) => (
        <Dropdown
        {...props}
        onChange={(e, data) => {
            onChange(data.key)
            {props.onChange && props.onChange()}
        } }
        errorMessage={
          props.errors[fieldName] && props.errors[fieldName].message
        }
        />
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
      defaultValue= {[]}
      render={({ field: { onChange } }) => (
        <TagPicker
          {...props}
          onChange={(e) => onChange(e.map(el => el.key))}
          removeButtonAriaLabel="Remove"
          pickerSuggestionsProps={pickerSuggestionsProps}
        />
      )}
    />
  );
};

interface InputUpload {
  id: string;
  className: string;
  onChange: any;
}
export const ControlledInputUpload: React.FC<HookFormProps & InputUpload> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={''}
      render={({ field: { onChange } }) => (
        <input 
        {...props}
        type="file"
        onChange={(e) => {
          onChange(e.target.files[0]) 
          props.onChange(e)}} 
         />
      )}
    />
  );
};