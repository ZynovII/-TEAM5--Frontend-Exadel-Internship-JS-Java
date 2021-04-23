import React, { useMemo } from "react";
import {
  Stack,
  PrimaryButton,
  IStackStyles,
  IDropdownStyles,
  ITag,
  Label,
  IStackItemStyles,
} from "@fluentui/react";
import { IFilterDropdownItem, IFilterData } from "./Models";
import { useForm } from "react-hook-form";
import {
  ControlledDropdown,
  ControlledTagPicker,
} from "../../hook-form/Controlled";

const stackStyles: IStackStyles = {
  root: {
    padding: "2rem",
    display: "block",
    "@media(min-width: 725px)": {
      display: "flex",
      flexWrap: "nowrap",
      margin: "0 auto",
      padding: "0"
    },
  },
  inner: {
    "@media(min-width: 725px)": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    width: "100%",
    margin: "0 2px",
    "@media(min-width: 725px)": {
      margin: "0 0.2rem",
      width: "15%",
    },
  },
};

const stackItemStyles: IStackItemStyles = {
  root: {
    margin: "0",
    width: "100%",
    "@media(min-width: 725px)": {
      width: "30%",
      margin: "0 0.2rem 0 0",
    },
  },
};

export const AllFilters: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFilterData>({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const onApplyFilter = () => {
    handleSubmit((data) => {
      console.log(data);
    })();
  };
  const filters: IFilterDropdownItem[] = useMemo(() => {
    return [
      {
        id: "1",
        key: "1",
        name: "eventType",
        placeholder: "All",
        label: "Event type",
        options: [
          { key: "Meet-up", text: "Meet-up" },
          { key: "Training", text: "Training" },
          { key: "Internship", text: "Internship" },
        ],
      },
      {
        id: "2",
        key: "2",
        name: "location",
        placeholder: "All",
        label: "Locations",
        options: [
          { key: "USA", text: "USA" },
          { key: "Belarus", text: "Belarus" },
          { key: "Russia", text: "Russia" },
          { key: "Ukraine", text: "Ukraine" },
        ],
      },
      {
        id: "3",
        key: "3",
        name: "level",
        placeholder: "All",
        label: "Level",
        options: [
          { key: "Trainee", text: "Trainee" },
          { key: "Junior", text: "Junior" },
          { key: "Middle", text: "Middle" },
          { key: "Senior", text: "Senior" },
        ],
      },
    ];
  }, []);

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

  return (
    <>
      <Stack styles={stackStyles} horizontal verticalAlign="end" wrap>
        <Stack.Item align="center" styles={stackItemStyles}>
          <Label>Tags</Label>
          <ControlledTagPicker
            name="tagPicker"
            control={control}
            eventTags={eventTags}
            onResolveSuggestions={filterSuggestedTags}
            itemLimit={5}
            aria-label="Tag picker"
          />
        </Stack.Item>
        <ControlledDropdown
          {...filters[0]}
          control={control}
          errors={errors}
          styles={dropdownStyles}
        />
        <ControlledDropdown
          {...filters[1]}
          control={control}
          errors={errors}
          styles={dropdownStyles}
        />
        <ControlledDropdown
          {...filters[2]}
          control={control}
          errors={errors}
          styles={dropdownStyles}
        />
        <div className="filter-btn button_center">
          <PrimaryButton
            onClick={onApplyFilter}
            text="Search"
            className="button"
          />
        </div>
      </Stack>
    </>
  );
};

export default AllFilters;
