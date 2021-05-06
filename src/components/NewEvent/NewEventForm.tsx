import React, { isValidElement, useMemo, useState, useEffect } from "react";
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
import axios from "axios";
import { useOptions } from "../../hooks/useOptions";
import { IOptionsEventFilter } from "../../models/Forms/IOptions";
import { ILocationFromBackEnd } from "../../models/ILocation";
import { ITech } from "../../models/IEvent";

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
  {
    name?: string;
    candidatePage?: boolean;
    candidat?: any;
    techs?: ITech[];
  } & IModalProps
> = ({ isModal, hideModal, ...props }) => {
  const { createEvent } = useEvents();
  const { fetchLocation, fetchEventTypes, fetchTechs } = useOptions();
  const [options, setOptions] = useState<IOptionsEventFilter>({
    locations: [],
    eventTypes: [],
    techs: [],
  });
  const [country, setCountry] = useState<ILocationFromBackEnd>();

  useEffect(() => {
    Promise.all([fetchLocation(), fetchEventTypes(), fetchTechs()]).then(
      (res) => {
        const options: IOptionsEventFilter = {
          locations: res[0],
          eventTypes: res[1],
          techs: res[2],
        };
        console.log(options);
        setOptions(options);
      }
    );
  }, []);

  const countries: IDropdownOption[] = useMemo(
    () =>
      options.locations.map((el) => ({
        key: el.name,
        text: el.name,
      })),
    [options]
  );
  const cities: IDropdownOption[] = useMemo(
    () => country?.cities.map((el) => ({ key: el, text: el })),
    [country]
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IEventForBackEnd>({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const [imageSrc, setImageSrc] = useState<File>();

  const isNameUniqe = (value) => {
    axios
      .get(`http://localhost:8081/api/events/uniqueness/${value}`)
      .then((res) => {
        console.log(res.data);
      });
  };

  // const validateEvenName = async(value)=>{
  //   const valid = await fetch(`http://localhost:8081/api/events/uniqueness/${value}`)

  // }
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
              // onBlur={isNameUniqe}
              control={control}
              name={"name"}
              errors={errors}
              rules={{
                required: "This field is required",
                //  validate: validateEvenName
              }}
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
              options={options.techs}
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
              options={countries}
              onChange={(_, data) => {
                const curr = options.locations.find(
                  (el) => el.name === data.key
                );
                setCountry(curr);
              }}
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
              options={cities}
              disabled={!props.candidatePage && !country}
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
              options={options.eventTypes}
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
