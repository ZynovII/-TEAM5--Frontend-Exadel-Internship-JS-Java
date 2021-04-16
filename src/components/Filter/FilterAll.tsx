import React, { useMemo } from "react";
import {
  Stack,
  PrimaryButton,
  IStackStyles,
  IDropdownStyles,
  ITag,
  Label,
} from "@fluentui/react";
import { IFilterDropdownItem, IFilterData } from "./Models";
import { useForm } from "react-hook-form";
import {
  ControlledDropdown,
  ControlledTagPicker,
} from "../../hook-form/ControlledTextField";

const stackStyles: IStackStyles = {
  root: {
    margin: "2em auto",
    width: "73%",
  },
  inner: {
    "@media(max-width: 600px)": {
      display: "block",
    },
  },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {},
  root: {
    width: "20%",
    minWidth: "150px",
    margin: "0 2px",
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
      let tags = null;
      if (Array.isArray(data.tagPicker)) {
        tags = data.tagPicker.map((item) => {
          return item["key"];
        });
      }

      const dataSubmit = {
        ...data,
        location: data.location["key"],
        eventType: data.eventType["key"],
        tagPicker: tags,
      };

      console.log(dataSubmit);
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
      "Junior",
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
      <Stack
        styles={stackStyles}
        horizontal
        verticalAlign="start"
        horizontalAlign="space-between"
        wrap
      >
        <ControlledDropdown
          {...filters[0]}
          control={control}
          errors={errors}
          styles={dropdownStyles}
        />
        <Stack.Item
          align="center"
          styles={{
            root: { margin: "0 2px", minWidth: "220px", width: "55%" },
          }}
        >
          <Label>Tags</Label>
          <ControlledTagPicker
            name="tagPicker"
            control={control}
            eventTags={eventTags}
            onResolveSuggestions={filterSuggestedTags}
            itemLimit={eventTags.length}
            aria-label="Tag picker"
          />
        </Stack.Item>
        <ControlledDropdown
          {...filters[1]}
          control={control}
          errors={errors}
          styles={dropdownStyles}
        />
      </Stack>
      <div className="margin2em button_center">
        <PrimaryButton
          onClick={onApplyFilter}
          text="Search"
          className="button"
        />
      </div>
    </>
  );
};

export default AllFilters;
