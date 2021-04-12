import React from "react";
import { Controller } from "react-hook-form";
import { ITextFieldProps, TextField, Dropdown, IDropdownProps } from "@fluentui/react";
import { HookFormProps } from "./HookFormProps";

export const ControlledTextField: React.FC<HookFormProps & ITextFieldProps> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({field:{ onChange, onBlur, value, name:fieldName}}) => (
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

export const ControlledDropdown: React.FC<HookFormProps & IDropdownProps  > = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({field:{ onChange, name:fieldName }}) => (
        <Dropdown
        {...props}
        onChanged= { onChange }
        errorMessage={
          props.errors[fieldName] && props.errors[fieldName].message
        }
        />
      )}
    />
  );
};

