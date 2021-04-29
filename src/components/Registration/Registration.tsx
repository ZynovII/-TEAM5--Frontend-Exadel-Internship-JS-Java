import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  ControlledTextField,
  ControlledDropdown,
  ControlledInputUpload,
} from "../../hook-form/Controlled";
import {
  Text,
  PrimaryButton,
  ITextFieldStyleProps,
  ITextFieldStyles,
  mergeStyleSets,
  IDropdownOption,
  IDropdownStyleProps,
  IDropdownStyles,
  Checkbox,
} from "@fluentui/react";
import { IApplicant, PreferredTime } from "../../models/IApplicant";
import { useBoolean } from "@fluentui/react-hooks";
import ModalWindow from "../ModalWindow";
import { preferredTimeReformer } from "../../utils/stringReformers";

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
      {
        key: PreferredTime.None,
        text: preferredTimeReformer(PreferredTime.None),
      },
      {
        key: PreferredTime.First,
        text: preferredTimeReformer(PreferredTime.First),
      },
      {
        key: PreferredTime.Second,
        text: preferredTimeReformer(PreferredTime.Second),
      },
      {
        key: PreferredTime.Third,
        text: preferredTimeReformer(PreferredTime.Third),
      },
      {
        key: PreferredTime.Fourth,
        text: preferredTimeReformer(PreferredTime.Fourth),
      },
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
      name: /^\D+\s\D+$/i,
      email: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i,
      phoneNumber: /\W\d+/ig,
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
      <h2 style={{ margin: "2em 0 1em" }}>{props.name}</h2>
      <div className={contentStyles.mediaContainer}>
        <div className={contentStyles.mediaItem}>
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
            className={contentStyles.margin}
          />
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
            className={contentStyles.margin}
          />
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
            className={contentStyles.margin}
          />
          <ControlledTextField
            required
            placeholder="Skype"
            control={control}
            name={"skype"}
            errors={errors}
            value={(props.candidatePage && props.candidat.skype) || ""}
            rules={{ required: "This field is required" }}
            styles={textFieldStyles}
            className={contentStyles.margin}
          />
        </div>
        <div className={contentStyles.mediaItem}>
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
            className={contentStyles.margin}
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
            className={contentStyles.margin}
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
            className={contentStyles.margin}
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
            className={contentStyles.margin}
          />
        </div>
      </div>
      <ControlledTextField
        placeholder="Summary"
        control={control}
        name={"summary"}
        errors={errors}
        className={contentStyles.margin}
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
          <Text className={contentStyles.margin} nowrap block>
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
    </>
  );
};

const contentStyles = mergeStyleSets({

  container: {
    margin: "1.5em auto",
  },

  checkboxes: {
    margin: "0 auto",
    marginTop: "20px",
    marginBottom: "20px",
    maxWidth: "800px",
  },

  margin: {
    backgroundColor: "transparent",
    margin: "0 0 20px",
  },
  mediaContainer: {
    "@media(min-width: 725px)": {
      display: "flex",
      justifyContent: "space-between",
    }
  },
  mediaItem: {
    "@media(min-width: 725px)": {
      width: '48%'
    }
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
