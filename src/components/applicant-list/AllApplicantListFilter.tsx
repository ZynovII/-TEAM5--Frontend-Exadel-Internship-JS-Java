import React from "react";
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
        options: [
          { key: "Internship JS & Java", text: "Internship JS & Java" },
          {
            key: "Business Analysis Meet UP",
            text: "Business Analysis Meet UP",
          },
          { key: "C++ interview", text: "C++ interview" },
        ],
      },
      {
        id: "456",
        key: "456",
        name: "skills",
        label: "Main skill",
        placeholder: "All skills",
        options: [
          { key: "JavaScript", text: "JavaScript" },
          { key: "Java", text: "Java" },
          { key: "Business Analysis", text: "Business Analysis" },
        ],
      },
      {
        id: "789",
        key: "789",
        name: "wstatus",
        label: "Status",
        placeholder: "Waiting status",
        options: [
          { key: "Registered", text: "Registered" },
          { key: "Awaiting HR interview", text: "Awaiting HR interview" },
          { key: "Waiting Desicion", text: "Waiting Desicion" },
        ],
      },
    ];
  }, []);

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
