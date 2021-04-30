import React, {useMemo} from "react";
import { Controller } from "react-hook-form";
import {
  ITextFieldProps,
  TextField,
  Dropdown,
  IDropdownProps,
  TagPicker,
  ITagPickerProps,
  IBasePickerSuggestionsProps,
  DatePicker,
  IDatePicker
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
  let dataMulti = useMemo(() => [], [])
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

          {props.onChange && props.onChange()}
          
          if (props.multiSelect) {
            if (data.selected) {
              dataMulti.push(data.key)
            } else {
              dataMulti = dataMulti.filter((item) => item != data.key)
            }
           return onChange( [...new Set(dataMulti)] )
          } 
            onChange( [data.key] )
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

interface DatePicker{
  showMonthPickerAsOverlay?: boolean
  placeholder: string
  ariaLabel: string
}
const dayPickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDays: ["S", "M", "T", "W", "T", "F", "S"],
  goToToday: "Go to today",
  weekNumberFormatString: "Week number {0}",
  prevMonthAriaLabel: "Previous month",
  nextMonthAriaLabel: "Next month",
  prevYearAriaLabel: "Previous year",
  nextYearAriaLabel: "Next year",
  prevYearRangeAriaLabel: "Previous year range",
  nextYearRangeAriaLabel: "Next year range",
  closeButtonAriaLabel: "Close",
  monthPickerHeaderAriaLabel: "{0}, select to change the year",
  yearPickerHeaderAriaLabel: "{0}, select to change the month",
};
export const ControlledDatePicker: React.FC<HookFormProps & DatePicker> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange } }) => (
        <DatePicker
          {...props}
          strings={dayPickerStrings}
          onSelectDate={(e) => onChange(e)}
        />
      )}
    />
  );
};
