import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Stack,
  PrimaryButton,
  IStackStyles,
  IDropdownStyles,
  ITag,
  Label,
  IStackItemStyles,
} from "@fluentui/react";
import { useForm } from "react-hook-form";

import { IFilterDropdownItem, IFilterData } from "./Models";
import { IOptionsEventFilter } from "../../models/Forms/IOptions";
import {
  ControlledDropdown,
  ControlledTagPicker,
} from "../../hook-form/Controlled";

const stackStyles: IStackStyles = {
  root: {
    display: "block",
    "@media(min-width: 725px)": {
      justifyContent: "space-between",
      margin: "2rem 0",
      display: "flex",
      flexWrap: "nowrap",
      padding: "0",
    },
  },
};
const stackStylesAdmin: IStackStyles = {
  root: {
    display: "block",
    "@media(min-width: 725px)": {
      display: "flex",
      flexWrap: "nowrap",
      padding: "0",
    },
  },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    width: "100%",
    margin: "0 2px",
    "@media(min-width: 725px)": {
      margin: "0 0.2rem",
      width: "20%",
    },
  },
};

const stackItemStyles: IStackItemStyles = {
  root: {
    margin: "0",
    width: "100%",
    "@media(min-width: 725px)": {
      width: "35%",
      margin: "0 0.2rem 0 0",
    },
    "& input": {
      backgroundColor: "#ffffff",
    },
  },
};

export interface IEventFilterProps {
  isAdminPage: boolean;
  options: IOptionsEventFilter;
  fetchEvents(page: number, size: number, filters: any): Promise<() => void>;
}

const EventFilters: React.FC<IEventFilterProps> = ({
  isAdminPage,
  options,
  fetchEvents,
}) => {
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
      const filters = {
        country: data["country"],
        status: [],
        tech: data["tagPicker"],
        type: data["eventType"],
      };
      fetchEvents(0, 6, filters).then((cb) => {
        cb();
      });
    })();
  };
  const filters: IFilterDropdownItem[] = useMemo(() => {
    return [
      {
        id: "0",
        key: "0",
        name: "eventType",
        placeholder: "All",
        label: "Event type",
        options: options.eventTypes,
      },
      {
        id: "1",
        key: "1",
        name: "country",
        placeholder: "All",
        label: "Country",
        options: options.locations.map((el) => ({
          key: el.name,
          text: el.name,
        })),
      },
      {
        id: "2",
        key: "2",
        name: "status",
        placeholder: "All",
        label: "Status",
        options: options.statuses,
      },
    ];
  }, [options]);

  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? options.techTags.filter(
          (tag) =>
            tag.key.toString().indexOf(filterText.toLowerCase()) === 0 &&
            !listContainsTagList(tag, tagList)
        )
      : [];
  };

  return (
    <Stack
      styles={isAdminPage ? stackStylesAdmin : stackStyles}
      horizontal
      verticalAlign="end"
    >
      <Stack.Item align="center" styles={stackItemStyles}>
        <Label>Tags</Label>
        <ControlledTagPicker
          name="tagPicker"
          control={control}
          eventTags={options.techTags}
          onResolveSuggestions={filterSuggestedTags}
          getTextFromItem={(item) => item.name}
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
      {isAdminPage && (
        <ControlledDropdown
          {...filters[2]}
          control={control}
          errors={errors}
          styles={dropdownStyles}
        />
      )}
      <div className="filter-btn button_center">
        <PrimaryButton
          onClick={onApplyFilter}
          text="Search"
          className="button"
        />
      </div>
    </Stack>
  );
};

export default EventFilters;
