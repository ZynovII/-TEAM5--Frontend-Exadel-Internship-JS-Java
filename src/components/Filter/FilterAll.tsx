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
import { ILocationFromBackEnd } from "../../models/ILocation";
import {
  ControlledDropdown,
  ControlledTagPicker,
} from "../../hook-form/Controlled";
import { useOptions } from "../../hooks/useOptions";
import { useLoader } from "../../hooks/hooks";

const stackStyles: IStackStyles = {
  root: {
    padding: "2rem",
    display: "block",
    "@media(min-width: 725px)": {
      display: "flex",
      flexWrap: "nowrap",
      margin: "0 auto",
      padding: "0",
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
  const { loading, showLoader, hideLoader } = useLoader();
  const [options, setOptions] = useState<IOptionsEventFilter>({
    locations: [],
    eventTypes: [],
    techTags: [],
  });
  const [country, setCountry] = useState<ILocationFromBackEnd>();
  const { fetchEventTypes, fetchLocation, fetchTechnology } = useOptions();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFilterData>({
    reValidateMode: "onSubmit",
    mode: "all",
  });
  useEffect(() => {
    showLoader();
    Promise.all([fetchEventTypes(), fetchLocation(), fetchTechnology()]).then(
      (res) => {
        const options: IOptionsEventFilter = {
          eventTypes: res[0],
          locations: res[1],
          techTags: res[2],
        };
        setOptions(options);
        hideLoader();
      }
    );
  }, []);

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
        options: options.eventTypes,
      },
      {
        id: "2",
        key: "2",
        name: "country",
        placeholder: "All",
        label: "Country",
        options: options.locations.map((el) => ({
          key: el.name,
          text: el.name,
        })),
        onChange: (_, data) => {
          const curr = options.locations.find((el) => el.name === data.key);
          setCountry(curr);
        },
      },
      {
        id: "3",
        key: "3",
        name: "cities",
        placeholder: "All",
        label: "Cities",
        options: country?.cities.map((el) => ({ key: el, text: el })),
      },
    ];
  }, [options, country]);

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
    <Stack styles={stackStyles} horizontal verticalAlign="end" wrap>
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
  );
};

export default AllFilters;
