import React, { useMemo, useState } from "react";
import { useId } from "@fluentui/react-hooks";
import { useForm } from "react-hook-form";
import {
  ControlledTextField,
  ControlledDropdown,
  ControlledDatePicker,
} from "../../hook-form/Controlled";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IIconProps,
  IDropdownOption,
  Stack,
  PrimaryButton,
  IconButton,
  IButtonStyles,
  ITextFieldStyles,
  IDropdownStyles,
  ITextFieldStyleProps,
  IDropdownStyleProps,
} from "@fluentui/react";
import { IEventForBackEnd } from "../../models/IEvent";
import { UploadImage } from "./UploadImage";
import { useEvents } from "../../hooks/useEvents";

interface IModalProps {
  isModal: boolean;
  hideModal: any;
}

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

export const NewEventForm: React.FC<
  { name?: string; candidatePage?: boolean; candidat?: any } & IModalProps
> = ({ isModal, hideModal, ...props }) => {
  const { createEvent } = useEvents();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IEventForBackEnd>({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const [imageSrc, setImageSrc] = useState<File>();
  // console.log("imageSrc",imageSrc.name);
  const onSave = () => {
    handleSubmit(
      (data) => {
        console.log(data);
        createEvent(data, imageSrc);
        hideModal();
      },
      (err) => {
        console.log("ошибка заполнения");
        console.log(err);
      }
    )();
  };

  const optionsOfCountries: IDropdownOption[] = useMemo(() => {
    return [
      { key: "belarus", text: "Belarus" },
      { key: "russia", text: "Russia" },
      { key: "ukraine", text: "Ukraine", disabled: true },
    ];
  }, []);

  const exampleOptionsOfCities: IDropdownOption[] = useMemo(() => {
    return [
      { key: "Minsk", text: "Minsk" },
      { key: "grodno", text: "Grodno" },
      { key: "gomel", text: "Gomel", disabled: true },
    ];
  }, []);

  const optionsOfTechnology: IDropdownOption[] = useMemo(() => {
    return [
      { key: "JavaScript", text: "JavaScript" },
      { key: "java", text: "Java" },
      { key: "python", text: "Python" },
      { key: "react", text: "React" },
      { key: "typeScript", text: "TypeScript" },
      { key: "c#", text: "C#" },
      { key: "data base", text: "Data base" },
    ];
  }, []);
  const optionsOfStatus: IDropdownOption[] = useMemo(() => {
    return [
      { key: "INTERNSHIP", text: "Intership" },
      { key: "meet-up", text: "Meet-up" },
      { key: "taining", text: "Training" },
    ];
  }, []);

  const [countryStatus, setCountryStatus] = useState<boolean>(true);

  const titleId = useId("title");

  return (
    <Modal
      titleAriaId={titleId}
      isOpen={isModal}
      onDismiss={hideModal}
      isBlocking={false}
      containerClassName={contentStyles.container}
    >
      <div className={contentStyles.header}>
        <span id={titleId}>New event</span>
        <IconButton
          styles={iconButtonStyles}
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={hideModal}
        />
      </div>

      <div className={contentStyles.body}>
        <Stack
          className={contentStyles.formWrapper}
          horizontal
          tokens={{ childrenGap: "40px" }}
          // styles={{ root: { width: "100%" } }}
        >
          <Stack
            tokens={{ childrenGap: "10px" }}
            styles={{ root: { width: 520 } }}
          >
            <ControlledTextField
              required={true}
              label="Event name"
              placeholder="Name"
              control={control}
              name={"name"}
              errors={errors}
              rules={{ required: "This field is required" }}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"techs"}
              multiSelect
              label={"Technology"}
              errors={errors}
              placeholder="Technology"
              // defaultSelectedKey={
              //   (props.candidatePage && props.candidat.country) || []
              // }
              // rules={{ required: "This field is required" }}
              options={optionsOfTechnology}
              styles={textFieldStyles}
            />

            <ControlledDropdown
              required
              control={control}
              name={"country"}
              multiSelect
              label={"Country"}
              errors={errors}
              placeholder="Country"
              // defaultSelectedKey={
              //   (props.candidatePage && props.candidat.country) || []
              // }
              rules={{ required: "This field is required" }}
              options={optionsOfCountries}
              onChange={() => setCountryStatus(false)}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              control={control}
              name={"cities"}
              multiSelect
              label="City"
              placeholder="City"
              // defaultSelectedKeys={
              //   (props.candidatePage && props.candidat.city) || []
              // }
              // rules={{ required: "This field is required" }}
              errors={errors}
              options={exampleOptionsOfCities}
              disabled={!props.candidatePage && countryStatus}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"type"}
              label={"CEvent type"}
              errors={errors}
              placeholder="Event type"
              // defaultSelectedKey={
              //   (props.candidatePage && props.candidat.country) || []
              // }
              rules={{ required: "This field is required" }}
              options={optionsOfStatus}
              styles={textFieldStyles}
            />
          </Stack>
          <Stack styles={{ root: { width: "40%" } }}>
            <UploadImage setImageSrc={setImageSrc} />
            <ControlledDatePicker
              control={control}
              name={"startDate"}
              label="Start date"
              showMonthPickerAsOverlay={true}
              placeholder="Select a date..."
              ariaLabel="Select a date"
            />
            <ControlledDatePicker
              control={control}
              name={"endDate"}
              label="Finish date"
              showMonthPickerAsOverlay={true}
              placeholder="Select a date..."
              ariaLabel="Select a date"
            />
          </Stack>
        </Stack>
        <ControlledTextField
          placeholder="Summary"
          control={control}
          name={"description"}
          errors={errors}
          className={contentStyles.lab}
          multiline
          autoAdjustHeight
          resizable={false}
        />
        <PrimaryButton
          className="button margin2em button_center"
          text="Submit"
          onClick={onSave}
        />
      </div>
    </Modal>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    maxWidth: "900px",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
  },
  lab: {
    backgroundColor: "transparent",
    margin: "20px 0",
  },
  control: { maxWidth: 300 },
  errorMessage: {
    backgroundColor: "transparent",
    position: "absolute",
    paddingTop: "0px",
  },
});

const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
