import React, { useEffect, useState, useMemo } from "react";
import { useForm,  } from "react-hook-form";
import { ControlledTextField, ControlledDropdown } from "../../hook-form/ControlledTextField";
import {
  Stack,
  Text,
  PrimaryButton,
  ITextFieldStyleProps,
  ITextFieldStyles,
  mergeStyleSets,
  IDropdownOption,
  Checkbox,
} from "@fluentui/react/lib";
import { IApplicant } from "./models";

import { useBoolean } from "@fluentui/react-hooks";
import ModalWindow from "../ModalWindow";

const textFieldStyles = (
  props: ITextFieldStyleProps
): Partial<ITextFieldStyles> => ({
  ...{
    errorMessage: {
      backgroundColor: "transparent",
      position: "absolute",
      paddingTop: "0px",
    },
  },
});

export const Registration = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean( false );
  const modalText =
    "Your application has been successfully sent. Our specialist will connect with you soon.";

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IApplicant>({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const optionsOfCountries: IDropdownOption[] = useMemo( () => {
    return [
      { key: "belarus", text: "Belarus" },
      { key: "russia",  text: "Russia" },
      { key: "ukraine", text: "Ukraine", disabled: true },
    ];
  }, [])

  const exampleOptionsOfCities: IDropdownOption[] = useMemo( () => {
    return [
      { key: "minsk", text: "Minsk" },
      { key: "grodno", text: "Grodno" },
      { key: "gomel", text: "Gomel", disabled: true },
    ];
  }, []) 

  const exampleTime: IDropdownOption[] = useMemo( () => {
    return [
      { key: "first", text: "10.00 - 12.00" },
      { key: "second", text: "12.00 - 14.00" },
      { key: "third", text: "14.00 - 16.00" },
      { key: "fourth", text: "16.00 - 18.00" },
    ];
  }, []) 

  const [countryStatus, setCountryStatus] = useState<boolean>(true);
  const [privacy, { setTrue: setPrivacyTrue, setFalse: setPrivacyFalse }] = useBoolean( false );
  const [personalData, { setTrue: setPersonalDataTrue, setFalse: setPersonalDataFalse }] = useBoolean( false );
  const [disabledButton, { setTrue: setDisabledButtonTrue, setFalse: setDisabledButtonFalse }] = useBoolean( true );

  const checkPrivacy = (event) => {
    event.target.checked ? setPrivacyTrue() : setPrivacyFalse()
  }
  
  const checkPersonalData = (event) => {
    event.target.checked ? setPersonalDataTrue() : setPersonalDataFalse()
  }

  useEffect(() => {
    personalData && privacy ? setDisabledButtonFalse() : setDisabledButtonTrue()
  }, [personalData, privacy])

  // const [fileName, setFileName] = useState<string>('')
  // const uploadFile = (event) => {
  //       setFileName(event.target.files[0].name)
  //     }
  const transform = onSubmitFunc => data => {
    let transformData = data;
    console.log("transform your data here", data);
    onSubmitFunc(transformData); // and return this the onsubmit
  };
  const onSave = (data) => {
    handleSubmit(
      (data) => {
        const dataSubmit = {...data, city: data.city['key'], country: data.country['key'], time: data.time['key'] }
        console.log(dataSubmit);
        showModal();
      },
      (err) => {
        console.log("ошибка заполнения");
        console.log(err);
      }
    )();
  };


  return (
    <>
      <ModalWindow open={isModalOpen} text={modalText} hideModal={hideModal} />
      <div className={contentStyles.container}>
        <h2 style={{ margin: "2em 0 1em" }}>{props.name}</h2>
        <Stack
          className={contentStyles.formWrapper}
          horizontal
          tokens={{ childrenGap: "40px" }}
        >
          <Stack
            tokens={{ childrenGap: "20px" }}
            styles={{ root: { width: "520px" } }}
          >
            <div className="username">
              <ControlledTextField
                required={true}
                placeholder="First and Last name"
                control={control}
                name={"fullName"}
                errors={errors}
                rules={{ required: "This field is required",
                        //  pattern: /[A-Za-z]{3}/,
                         validate: {
                           only: (v) => v.length > 3
                         },
                        }} 
                styles={textFieldStyles}
              />
            </div>
            <div className="email">
              <ControlledTextField
                required={true}
                placeholder="Email"
                control={control}
                name={"email"}
                errors={errors}
                rules={{ required: "This field is required" }}
                styles={textFieldStyles}
              />
            </div>
            <div className="phone">
              <ControlledTextField
                placeholder="Phone"
                control={control}
                name={"phone"}
                errors={errors}
                // rules={{ required: "This field is required" }}
                styles={textFieldStyles}
              />
            </div>
            <div className="skype">
              <ControlledTextField
                required={true}
                placeholder="Skype"
                control={control}
                name={"skype"}
                errors={errors}
                rules={{ required: "This field is required" }}
                styles={textFieldStyles}
              />
            </div>
          </Stack>
          <Stack
            tokens={{ childrenGap: "20px" }}
            styles={{ root: { width: "520px" } }}
          >
            <ControlledTextField
              placeholder="Cv link"
              control={control}
              name={"cv"}
              errors={errors}
              // rules={{ required: "This field is required" }}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              control={control}
              name={"country"}
              errors={errors}
              placeholder="Country"
              options={optionsOfCountries}
              onChange={() => setCountryStatus(false)}
            />
             
            <ControlledDropdown
              control={control}
              name={"city"}
              errors={errors}
              placeholder="City"
              options={exampleOptionsOfCities}
              disabled={countryStatus}
            />
            <ControlledDropdown
              control={control}
              name={"time"}
              errors={errors}
              placeholder="Choose time"
              options={exampleTime}
            />
          </Stack>
        </Stack>
        <ControlledTextField
          placeholder="Summary"
          control={control}
          name={"summary"}
          errors={errors}
          // rules={{ required: "This field is required" }}
          className={contentStyles.lab}
          multiline
          resizable={false}
        />
        <Text className={contentStyles.lab} nowrap block>
          * Fields marked with * are required
        </Text>
        {/* <input type='file' id="files" className="input-file__input" onChange={uploadFile}/>
        <label htmlFor="files" className="input-file__label">Загрузить файл</label>
        <span>{fileName}</span>  */}
        <div className={contentStyles.checkboxes}>
          <Checkbox
            onChange={checkPersonalData}
            label="By applying for this position, I submit my personal data to the Exadel and give my consent for the processing of personal data for job recruitment purpose"
          />
          <Checkbox
            onChange={checkPrivacy}
            label="I understand and accept that for purpose of evaluation of my application, professional skills and experience my personal data may be accessible to the intra-group companies of Exadel"
          />
        </div>
        <PrimaryButton
          className="button margin2em button_center"
          text="Submit"
          onClick={onSave}
          disabled={disabledButton}
        />
      </div>
    </>
  );
};

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  container: {
    width: "73%",
    margin: "2em auto",
  },

  checkboxes: {
    margin: "0 auto",
    marginTop: "20px",
    marginBottom: "20px",
    maxWidth: "800px",
  },

  lab: {
    backgroundColor: "transparent",
    margin: "20px 0",
  },

  submitButton: {
    margin: "0 auto",
    display: "flex",
  },
});
