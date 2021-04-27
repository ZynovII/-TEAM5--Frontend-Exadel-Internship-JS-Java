import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  ControlledTextField,
  ControlledDropdown,
  ControlledInputUpload,
} from "../../hook-form/Controlled";
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
import { IApplicant, PreferredTime } from "../../models/IApplicant";
import { useBoolean } from "@fluentui/react-hooks";
import ModalWindow from "../ModalWindow";

export const Registration: React.FC<{
  name?: string;
  candidatePage?: boolean;
  candidat?: IApplicant;

}> = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
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

  const optionsOfCountries: IDropdownOption[] = useMemo(() => {
    return [
      { key: "Belarus", text: "Belarus" },
      { key: "Russia", text: "Russia" },
      { key: "Ukraine", text: "Ukraine", disabled: true },
    ];
  }, []);

  const exampleOptionsOfCities: IDropdownOption[] = useMemo(() => {
    return [
      { key: "Minsk", text: "Minsk" },
      { key: "Grodno", text: "Grodno" },
      { key: "Gomel", text: "Gomel", disabled: true },
    ];
  }, []);

  const exampleTime: IDropdownOption[] = useMemo(() => {
    return [
      { key: PreferredTime.None, text: PreferredTime.None },
      { key: PreferredTime.Any, text: PreferredTime.Any },
      { key: PreferredTime.First, text: PreferredTime.First },
      { key: PreferredTime.Second, text: PreferredTime.Second },
      { key: PreferredTime.Third, text: PreferredTime.Third },
      { key: PreferredTime.Fourth, text: PreferredTime.Fourth },
    ];
  }, []);
  const exampleOptionsOfTechnology: IDropdownOption[] = useMemo(() => {
    return [
      { key: "JavaScript", text: "JavaScript" },
      { key: "Java", text: "Java" },
    ];
  }, []);
  const registrationPattern: {
    name: RegExp;
    email: RegExp;
    phoneNumber: RegExp;
  } = useMemo(() => {
    return {
      name: /^[a-z]+ [a-z]+$|^[а-яА-Я]+ [а-яА-Я]+$/i, // поправь без ограничения по языку
      email: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i,
      phoneNumber: /^(8|\+375) ?([(]\d+[)])? ?\d+/i, // поправь только на цифры скобки и тире
    };
  }, []);

  const [countryStatus, setCountryStatus] = useState<boolean>(true);
  const [
    privacy,
    { setTrue: setPrivacyTrue, setFalse: setPrivacyFalse },
  ] = useBoolean(false);
  const [
    personalData,
    { setTrue: setPersonalDataTrue, setFalse: setPersonalDataFalse },
  ] = useBoolean(false);
  const [
    disabledButton,
    { setTrue: setDisabledButtonTrue, setFalse: setDisabledButtonFalse },
  ] = useBoolean(true);

  const checkPrivacy = (event) => {
    event.target.checked ? setPrivacyTrue() : setPrivacyFalse();
  };

  const checkPersonalData = (event) => {
    event.target.checked ? setPersonalDataTrue() : setPersonalDataFalse();
  };

  useEffect(() => {
    personalData && privacy
      ? setDisabledButtonFalse()
      : setDisabledButtonTrue();
  }, [personalData, privacy]);

  const [fileName, setFileName] = useState<string>("");
  const uploadFile = (event) => {
    setFileName(event.target.files[0].name);
  };

  const onSave = () => {
    handleSubmit(
      (data) => {
        console.log(data);
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
            styles={{ root: { width: "50%" } }}
          >
            <div className="username">
              <ControlledTextField
                required
                placeholder="First and Last name"
                control={control}
                name={"fullName"}
                errors={errors}
                value={(props.candidatePage && props.candidat.fullName) || ""}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: registrationPattern.name,
                    message: "Invalid name",
                  },
                }}
                styles={textFieldStyles}
              />
            </div>
            <div className="email">
              <ControlledTextField
                required
                placeholder="Email"
                control={control}
                name={"email"}
                errors={errors}
                value={(props.candidatePage && props.candidat.email) || ""}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: registrationPattern.email,
                    message: "Invalid email",
                  },
                }}
                styles={textFieldStyles}
              />
            </div>
            <div className="phone">
              <ControlledTextField
                placeholder="Phone"
                control={control}
                name={"phoneNumber"}
                errors={errors}
                value={
                  (props.candidatePage && props.candidat.phoneNumber) || ""
                }
                rules={{
                  pattern: {
                    value: registrationPattern.phoneNumber,
                    message: "Invalid phone number",
                  },
                }}
                styles={textFieldStyles}
              />
            </div>
            <div className="skype">
              <ControlledTextField
                required
                placeholder="Skype"
                control={control}
                name={"skype"}
                errors={errors}
                value={(props.candidatePage && props.candidat.skype) || ""}
                rules={{ required: "This field is required" }}
                styles={textFieldStyles}
              />
            </div>
          </Stack>
          <Stack
            tokens={{ childrenGap: "20px" }}
            styles={{ root: { width: "50%" } }}
          >
            <ControlledDropdown
              control={control}
              name={"technology"}
              placeholder="Technology"
              defaultSelectedKey={
                (props.candidatePage && props.candidat.technology) || ""
              }
              required
              rules={{ required: "This field is required" }}
              errors={errors}
              options={exampleOptionsOfTechnology}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"country"}
              errors={errors}
              placeholder="Country"
              defaultSelectedKey={
                (props.candidatePage && props.candidat.country) || ""
              }
              rules={{ required: "This field is required" }}
              options={optionsOfCountries}
              onChange={() => setCountryStatus(false)}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"city"}
              placeholder="City"
              defaultSelectedKey={
                (props.candidatePage && props.candidat.city) || ""
              }
              rules={{ required: "This field is required" }}
              errors={errors}
              options={exampleOptionsOfCities}
              disabled={!props.candidatePage && countryStatus}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              control={control}
              name={"preferredTime"}
              placeholder="Choose time"
              defaultSelectedKey={
                (props.candidatePage && props.candidat.preferredTime) || ""
              }
              errors={errors}
              options={exampleTime}
              styles={textFieldStyles}
            />
          </Stack>
        </Stack>
        <ControlledTextField
          placeholder="Summary"
          control={control}
          name={"summary"}
          errors={errors}
          className={contentStyles.lab}
          multiline
          autoAdjustHeight
          resizable={false}
          value={(props.candidatePage && props.candidat.summary) || ""}
        />
        <ControlledInputUpload
          control={control}
          name={"resumeLink"}
          id={"cv"}
          className="input-file__input"
          onChange={(e) => uploadFile(e)}
        />
        <label htmlFor="cv" className="input-file__label">
          Upload CV
        </label>
        <span>{fileName}</span>
        {props.candidatePage ? (
          <>
            <PrimaryButton
              className="button margin2em button_center"
              text="Submit"
              onClick={onSave}
            />
          </>
        ) : (
          <>
            <Text className={contentStyles.lab} nowrap block>
              * Fields marked with * are required
            </Text>
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
          </>
        )}
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
    margin: "1.5em auto",
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

  errorMessage: {
    backgroundColor: "transparent",
    position: "absolute",
    paddingTop: "0px",
  },
});

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
