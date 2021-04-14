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
  IDropdownStyleProps,
  IDropdownStyles,
  Checkbox,
} from "@fluentui/react/lib";
import { IApplicant } from "./models";

import { useBoolean } from "@fluentui/react-hooks";
import ModalWindow from "../ModalWindow";

import classes from './Registration.module.scss';

const textFieldStyles = (
  props: ITextFieldStyleProps | IDropdownStyleProps
): Partial<ITextFieldStyles | IDropdownStyles > => ({
  ...{
    errorMessage: {
      backgroundColor: "transparent",
      position: "absolute",
      paddingTop: "0px",
    },
  },
});

export const Registration:React.FC<{name: string}> = (props) => {
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

  const registrationPattern:{name: RegExp, email: RegExp, phoneNumber: RegExp} = useMemo( () => {
    return {
      name: /^[a-z]+ [a-z]+$|^[а-яА-Я]+ [а-яА-Я]+$/i,
      email: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i,
      phoneNumber: /^(8|\+375) ?([(]\d+[)])? ?\d+/i
    }
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
 
  const onSave = () => {
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
      <div className={classes.Registration__container}>
        <h2 style={{ margin: "2em 0 1em" }}>{props.name}</h2>
        <div className={classes['Registration__form-wrapper']}>
          <Stack className = {classes['Registration__form-stack']}>
            <div className="username">
              <ControlledTextField
                required={true}
                placeholder="First and Last name"
                control={control}
                name={"fullName"}
                errors={errors}
                rules={{ required: "This field is required",
                         pattern: {
                          value: registrationPattern.name,
                          message: "Invalid name"
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
                rules={{ required: "This field is required",
                         pattern: {
                          value: registrationPattern.email,
                          message: "Invalid email"
                         },
                        }} 
                styles={textFieldStyles}
              />
            </div>
            <div className="phone">
              <ControlledTextField
                placeholder="Phone"
                control={control}
                name={"phone"}
                errors={errors}
                rules={{ 
                  pattern: {
                  value: registrationPattern.phoneNumber,
                  message: "Invalid phone number"
                  },
               }} 
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
          <Stack className={classes['Registration__form-stack']}>
            <ControlledTextField
              placeholder="Cv link"
              control={control}
              name={"cv"}
              errors={errors}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"country"}
              errors={errors}
              placeholder="Country"
              rules={{ required: "This field is required" }}
              options={optionsOfCountries}
              onChange={() => setCountryStatus(false)}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"city"}
              errors={errors}
              placeholder="City"
              rules={{ required: "This field is required" }}
              options={exampleOptionsOfCities}
              disabled={countryStatus}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"time"}
              errors={errors}
              placeholder="Choose time"
              rules={{ required: "This field is required" }}
              options={exampleTime}
              styles={textFieldStyles}
            />
          </Stack>
        </div>
        <ControlledTextField
          placeholder="Summary"
          control={control}
          name={"summary"}
          errors={errors}
          className={classes['Registration__form-textfield']}
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
            className={classes['Registration__form-checkbox']}
            onChange={checkPersonalData}
            label="By applying for this position, I submit my personal data to the Exadel and give my consent for the processing of personal data for job recruitment purpose"
          />
          <Checkbox
            className = {classes['Registration__form-checkbox']}
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
  // formWrapper: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "stretch",
  // },

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
    backgroundColor: 'transparent',
    margin: '20px 0'
  },

  submitButton: {
    margin: "0 auto",
    display: "flex",
  },
  
  errorMessage: {
    backgroundColor: "transparent",
    position: "absolute",
    paddingTop: "0px",
  },
});
