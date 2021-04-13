import React from "react";
import { Controller } from "react-hook-form";
import { ITextFieldProps, TextField, Dropdown, IDropdownProps,TagPicker,ITagPickerProps} from "@fluentui/react";
import { HookFormProps } from "./HookFormProps";


export const ControlledTagPicker: React.FC<HookFormProps & ITagPickerProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({field:{ onChange}}) => (
        <TagPicker
          {...props}
          onChange={onChange}
        />
      )}
    />
  );
};