import React, { useMemo, useState } from "react";
import { useId } from "@fluentui/react-hooks";
import { useForm } from "react-hook-form";
import {
  ControlledTextField,
  ControlledDropdown,
  ControlledTagPicker,
  ControlledDatePicker,
} from "../../hook-form/Controlled";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IIconProps,
  IDropdownOption,
  ITag,
  Stack,
  DatePicker,
  IDatePicker,
  PrimaryButton,
  IconButton,
  IButtonStyles,
  ITextFieldStyles,
  IDropdownStyles,
  ITextFieldStyleProps,
  IDropdownStyleProps,
  Label,
} from "@fluentui/react";
import { IEvent } from "../../models/IEvent";
import { UploadImage } from "./UploadImage";

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
  const [value, setValue] = React.useState<Date | undefined>();
  const datePickerRef = React.useRef<IDatePicker>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IEvent>({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const onSave = () => {
    handleSubmit(
      (data) => {
        console.log(data);
        hideModal();
      },
      (err) => {
        console.log("ошибка заполнения");
        console.log(err);
      }
    )();
  };

  const eventTags: ITag[] = useMemo(() => {
    return [
      "JavaScript",
      "Java",
      "Python",
      "React",
      "Web",
      "Frontend",
      "Backend",
      "c#",
      "TypeScript",
      "Data base",
    ].map((item) => ({ key: item.toLowerCase(), name: item }));
  }, []);

  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? eventTags.filter(
          (tag) =>
            tag.key.toString().indexOf(filterText.toLowerCase()) === 0 &&
            !listContainsTagList(tag, tagList)
        )
      : [];
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
      { key: "minsk", text: "Minsk" },
      { key: "grodno", text: "Grodno" },
      { key: "gomel", text: "Gomel", disabled: true },
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
        >
          <Stack
            tokens={{ childrenGap: "10px" }}
            styles={{ root: { width: "520px" } }}
          >
            <ControlledTextField
              required={true}
              label="Event name"
              placeholder="Name"
              control={control}
              name={"fullName"}
              errors={errors}
              rules={{ required: "This field is required" }}
              styles={textFieldStyles}
            />
            <ControlledDatePicker
              control={control}
              name={"eventStartDate"}
              label="Start date"
              showMonthPickerAsOverlay={true}
              placeholder="Select a date..."
              ariaLabel="Select a date"
            />
            <Stack.Item>
              <Label>Technologies</Label>
              <ControlledTagPicker
                name="tagPicker"
                control={control}
                eventTags={eventTags}
                onResolveSuggestions={filterSuggestedTags}
                itemLimit={5}
                aria-label="Tag picker"
              />{" "}
            </Stack.Item>

            <ControlledDropdown
              required
              control={control}
              name={"country"}
              label={"Country"}
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
              label="City"
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
          </Stack>
          <UploadImage />
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
    maxWidth: "750px",
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
