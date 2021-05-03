import React, { useEffect, useState } from "react";
import { useMemo } from "react";

import { ControlledDropdown } from "../../hook-form/Controlled";
import { useForm } from "react-hook-form";
import { IFilterDropdownItem, IFilterData } from "../Filter/Models";
import {
  IStackStyles,
  IDropdownStyles,
  Stack,
  PrimaryButton,
} from "@fluentui/react";
import { useOptions } from "../../hooks/useOptions";

const stackStyles: IStackStyles = {
  root: {
    padding: "2rem",
    display: "block",
    "@media(min-width: 725px)": {
      display: "flex",
      flexWrap: "nowrap",
      margin: "0 auto",
      padding: "0",
      maxWidth: "73%",
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

export const AllApplicantFilter: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFilterData>({
    reValidateMode: "onSubmit",
    mode: "all",
  });
  const [options, setOptions] = useState({
    eventTypes: [],
    techs: [],
    interviewStatuses: [],
  });
  const {
    fetchEventTypes,
    fetchInterviewStatuses,
    fetchTechnology,
  } = useOptions();

  useEffect(() => {
    Promise.all([
      fetchEventTypes(),
      fetchTechnology(),
      fetchInterviewStatuses(),
    ]).then((res) => {
      setOptions({
        eventTypes: res[0],
        techs: res[1],
        interviewStatuses: res[2],
      });
    });
  }, []);

  const onApplyFilter = () => {
    handleSubmit((data) => {
      const dataSubmit = {
        ...data,
      };

      console.log(dataSubmit);
    })();
  };

  const filters: IFilterDropdownItem[] = useMemo(() => {
    return [
      {
        id: "123",
        key: "123",
        name: "events",
        label: "Event Type",
        placeholder: "All events",
        options: options.eventTypes,
      },
      {
        id: "456",
        key: "456",
        name: "skills",
        label: "Main skill",
        placeholder: "All skills",
        options: options.techs,
      },
      {
        id: "789",
        key: "789",
        name: "wstatus",
        label: "Status",
        placeholder: "Waiting status",
        options: options.interviewStatuses,
      },
    ];
  }, [options]);

  return (
    <div>
      <Stack
        styles={stackStyles}
        horizontal
        verticalAlign="end"
        horizontalAlign="space-between"
        wrap
      >
        {filters.map((obj: IFilterDropdownItem) => (
          <ControlledDropdown
            label={obj.label}
            key={obj.key}
            control={control}
            name={obj.name}
            placeholder={obj.placeholder}
            options={obj.options}
            errors={errors}
            styles={dropdownStyles}
          />
        ))}
        <div className="filter-btn button_center">
          <PrimaryButton
            onClick={onApplyFilter}
            text="Search"
            className="button"
          />
        </div>
      </Stack>
    </div>
  );
};
