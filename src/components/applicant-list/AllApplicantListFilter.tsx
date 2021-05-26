import React, { useEffect, useState } from "react";
import { useMemo } from "react";

import { ControlledDropdown } from "../../hook-form/Controlled";
import { useForm } from "react-hook-form";
import { IFilterData, IFilterDropdownItem } from "../Filter/Models";
import {
  IStackStyles,
  IDropdownStyles,
  Stack,
  PrimaryButton,
} from "@fluentui/react";
import { useApplicants } from "../../hooks/useApplicants";

const stackStyles: IStackStyles = {
  root: {
    padding: "2rem",
    display: "block",
    "@media(min-width: 725px)": {
      display: "flex",
      flexWrap: "nowrap",
      margin: "0 auto",
      padding: "0",
      maxWidth: "83%",
    },
  },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    width: "100%",
    margin: "0 2px",
    "@media(min-width: 725px)": {
      margin: "0 0.2rem",
      width: "17%",
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
    eventName: [],
    primaryTech: [],
    interviewProсcess: [],
    countryName: [],
    status: [],
  });

  const { getInfoForFilters, fetchApplicants } = useApplicants();

  useEffect(() => {
    getInfoForFilters().then((res) => {
      console.log(res)
      setOptions(res);
    });
  }, []);

  const onApplyFilter = () => {
    handleSubmit((data) => {
      fetchApplicants(0, 14, data).then((cb)=>cb());
    })();
  };

  const filters: IFilterDropdownItem[] = useMemo(() => {
    return [
      {
        id: "123",
        key: "123",
        name: "eventName",
        label: "Event Name",
        placeholder: "All events",
        options: options.eventName,
      },
      {
        id: "456",
        key: "456",
        name: "primaryTech",
        label: "Primary Tech",
        placeholder: "All techs",
        options: options.primaryTech,
      },
      {
        id: "789",
        key: "789",
        name: "interviewProсcess",
        label: "Interview Proсcess",
        placeholder: "Waiting status",
        options: options.interviewProсcess,
      },
      {
        id: "78",
        key: "78",
        name: "countryName",
        label: "Country",
        placeholder: "All countries",
        options: options.countryName,
      },
      {
        id: "79",
        key: "79",
        name: "status",
        label: "Status",
        placeholder: "All",
        options: options.status,
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
            multiSelect
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
