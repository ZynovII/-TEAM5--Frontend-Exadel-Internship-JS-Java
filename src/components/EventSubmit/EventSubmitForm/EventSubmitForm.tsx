import React from "react";
import "./EventSubmitForm.scss";

import { TextField } from "@fluentui/react/lib/TextField";
import {
  IDropdownOption,
  IDropdownStyles,
  ITextFieldStyleProps,
  ITextFieldStyles,
  IDropdownStyleProps,
} from "@fluentui/react/lib";
import DatePick from "../Helpers/DatePick/DatePick";

import {
  ControlledTextField,
  ControlledDropdown,
  ControlledTagPicker,
} from "../../../hook-form/Controlled";

import { useForm } from "react-hook-form";

const textFieldStyles = (
  props: ITextFieldStyleProps | IDropdownStyleProps
): Partial<ITextFieldStyles | IDropdownStyles> => ({
  ...{
    errorMessage: {
      backgroundColor: "transparent",
      position: "absolute",
      paddingTop: "0px",
    },
  },
});

const eventSubmitForm = (props) => {
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

  const option = (value) => {
    const options: IDropdownOption[] = value;
    return options;
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const [countryStatus, setCountryStatus] = React.useState<boolean>(true);

  return (
    <div className="center-block">
      <div className="event-submit">
        <div className="event-submit__wrapper">
          <header className="event-submit__title-wrapper">
            <h2>New Event</h2>
          </header>
          <form
            className="event-submit__form"
            onSubmit={handleSubmit(props.submit)}
          >
            <div className="event-submit__body">
              <div className="event-submit__image">
                <img src="https://via.placeholder.com/259x259" alt="#" />
              </div>
              <div className="event-submit__inputs">
                <ControlledTextField
                  required
                  placeholder="First and Last name"
                  control={control}
                  name={"fullName"}
                  errors={errors}
                  rules={{
                    required: "This field is required",
                  }}
                  styles={textFieldStyles}
                />
                <DatePick />
                <ControlledDropdown
                  required
                  control={control}
                  name={"country"}
                  placeholder="Country"
                  options={option(props.country)}
                  onChange={() => setCountryStatus(false)}
                  styles={textFieldStyles}
                />
                <ControlledDropdown
                  required
                  control={control}
                  name={"city"}
                  placeholder="City"
                  options={option(props.city)}
                  styles={textFieldStyles}
                />
                <ControlledDropdown
                  required
                  control={control}
                  name={"Technologies"}
                  options={option(props.technology)}
                  selectedKeys={selectedKeys}
                  placeholder="Technologies"
                  multiSelect
                  styles={textFieldStyles}
                />  
                {/* REPLACE TO TAG PICKER!!! */}
              </div>
            </div>
            <div className="event-submit__description">
              <textarea
                {...register("description")}
                placeholder="Description"
              ></textarea>
            </div>
            <div className="event-submit__button">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default eventSubmitForm;
