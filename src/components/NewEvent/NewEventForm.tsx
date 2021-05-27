import React, { useMemo, useState, useEffect } from "react";
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
import { useOptions } from "../../hooks/useOptions";
import { IOptionsNewEventDropdown } from "../../models/Forms/IOptions";
import { IEvent } from "../../models/IEvent";
import { ITech } from "../../models/IEvent";
import { useIsMountedRef } from "../../hooks/useIsMounted";
import { EVENTS_SIZE } from "../EventList/EventList";

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
      position: "sticky",
      paddingTop: "0px",
    },
  },
});

export const NewEventForm: React.FC<
  {
    eventCard: boolean;
    cardItem?: IEvent;
    techsNewEvent?: ITech[];
    imageEvent: string;
    loadMore: (page: number, size: number) => void;
  } & IModalProps
> = ({ isModal, hideModal, loadMore, ...props }) => {
  const { createEvent, isNameUniqe, updateEvent, fetchEvents } = useEvents();
  const { fetchLocation, fetchEventTypes, fetchTechs } = useOptions();
  const [options, setOptions] = useState<IOptionsNewEventDropdown>({
    locations: [],
    eventTypes: [],
    techsNewEvent: [],
  });
  const [country, setCountry] = useState([]);
  const [imageSrc, setImageSrc] = useState<File>();
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    Promise.all([fetchLocation(), fetchEventTypes(), fetchTechs()]).then(
      (res) => {
        const options: IOptionsNewEventDropdown = {
          locations: res[0],
          eventTypes: res[1],
          techsNewEvent: res[2],
        };
        isMountedRef.current && setOptions(options);
        if (props.cardItem) {
          const country = [
            ...new Set(props.cardItem.locations.map((el) => el.country)),
          ];
          setCountry(country);
        }
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
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IEventForBackEnd>({
    reValidateMode: "onSubmit",
  });

  const cities: IDropdownOption[] = useMemo(() => {
    const current = [];
    if (country)
      country.forEach((elem) =>
        current.push(options.locations.find((opt) => opt.name === elem).cities)
      );
    return current.flat().map((el) => ({ key: el, text: el }));
  }, [country]);

  const onSave = () => {
    handleSubmit(
      (data) => {
        if (!props.cardItem) createEvent(data, imageSrc);
        else {
          updateEvent(data, props.cardItem.id, imageSrc).then(() => {
            loadMore(0, EVENTS_SIZE - 1);
          });
        }
        hideModal();
        setCountry([]);
        fetchEvents(0, 5).then((cb) => {
          if (isMountedRef.current) cb();
        });
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
          onClick={() => {
            hideModal();
            setCountry([]);
          }}
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
              value={(props.cardItem && props.cardItem.name) || ""}
              // onBlur={isNameUniqe}
              control={control}
              name={"name"}
              errors={errors}
              rules={{
                required: "This field is required",
                validate: !props.cardItem && isNameUniqe,
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
              defaultSelectedKeys={
                props.cardItem && props.cardItem.techs.map((el) => el.name)
              }
              // rules={{ required: "This field is required" }}
              options={options.techsNewEvent}
              styles={textFieldStyles}
            />

            <ControlledDropdown
              control={control}
              name={"country"}
              multiSelect
              label={"Country"}
              errors={errors}
              placeholder="Country"
              defaultSelectedKeys={
                (props.cardItem && [
                  ...new Set(props.cardItem.locations.map((el) => el.country)),
                ]) ||
                []
              }
              options={countries}
              onChange={(_, data) => {
                setCountry((prev) =>
                  data.selected
                    ? [...prev, data.key]
                    : prev.filter((key) => key !== data.key)
                );
                // setCountry((prev)=>[...prev, data]);
              }}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              control={control}
              name={"cities"}
              multiSelect
              label="City"
              placeholder="City"
              defaultSelectedKeys={
                (props.cardItem &&
                  props.cardItem.locations.map((el) => el.city)) ||
                []
              }
              errors={errors}
              options={cities}
              disabled={!props.cardItem && !country}
              styles={textFieldStyles}
            />
            <ControlledDropdown
              required
              control={control}
              name={"type"}
              label={"Event type"}
              errors={errors}
              placeholder="Event type"
              defaultSelectedKey={(props.cardItem && props.cardItem.type) || ""}
              rules={{ required: "This field is required" }}
              options={options.eventTypes}
              styles={textFieldStyles}
            />
          </Stack>
          <Stack styles={{ root: { width: "40%" } }}>
            <UploadImage
              setImageSrc={setImageSrc}
              eventImage={props.imageEvent}
            />
            <ControlledDatePicker
              control={control}
              allowTextInput={true}
              name={"startDate"}
              label="Start date"
              showMonthPickerAsOverlay={true}
              placeholder="Select a date..."
              ariaLabel="Select a date"
              value={
                (props.cardItem && new Date(props.cardItem.startDate)) || null
              }
            />
            <ControlledDatePicker
              control={control}
              allowTextInput={true}
              name={"endDate"}
              label="Finish date"
              showMonthPickerAsOverlay={true}
              placeholder="Select a date..."
              ariaLabel="Select a date"
              value={
                (props.cardItem && new Date(props.cardItem.startDate)) || null
              }

            />
          </Stack>
        </Stack>
        <ControlledTextField
          placeholder="Summary"
          control={control}
          name={"description"}
          value={(props.cardItem && props.cardItem.description) || ""}
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
