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
    width: "30%",
    minWidth: "200px",
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
        id: 1,
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
        id: 3,
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
        verticalAlign="center"
        horizontalAlign="space-between"
        wrap
      >
        {filters.map((obj: IFilterDropdownItem) => (
          <ControlledDropdown
            label={obj.label}
            key={obj.id}
            control={control}
            name={obj.name}
            placeholder={obj.placeholder}
            options={obj.options}
            errors={errors}
            styles={dropdownStyles}
          />
        ))}
        <Stack.Item
          align="center"
          styles={{
            root: { margin: "0 2px", minWidth: "200px", width: "30%" },
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
