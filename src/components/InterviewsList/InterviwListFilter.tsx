import React from "react";
import { useMemo } from "react";
import { ControlledDropdown } from "../../hook-form/ControlledTextField";
import { useForm } from "react-hook-form";
import { IFilterDropdownItem, IFilterData } from "../Filter/Models";
import { IStackStyles, IDropdownStyles, Stack } from "@fluentui/react";

const stackStyles: IStackStyles = {
  root: {
    margin: "0 auto 2rem",
    width: "87%",
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
    minWidth: "200px",
    margin: "0 2px",
  },
};

export const InterviewListFilter: React.FC = () => {
  const {
    formState: { errors },
    control,
  } = useForm<IFilterData>({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const filters: IFilterDropdownItem[] = useMemo(() => {
    return [
      {
        id: 456,
        name: "Date",
        label: "Date of Interview",
        placeholder: "Date of interniew",
        options: [
          { key: "1", text: "18.03.2021" },
          { key: "2", text: "18.03.2021" },
          { key: "3", text: "19.03.2021" },
          { key: "4", text: "19.03.2021" },
        ],
      },
      {
        id: 457,
        name: "time",
        label: "Time of Interview",
        placeholder: "Time of interniew",
        options: [
          { key: "1", text: "18:00" },
          { key: "2", text: "15:00" },
          { key: "3", text: "10:00" },
          { key: "4", text: "16:00" },
        ],
      },
      {
        id: 123,
        name: "events",
        label: "Events",
        placeholder: "All events",
        options: [
          { key: "4", text: "Internship JS & Java" },
          { key: "5", text: "Business Analysis Meet UP" },
          { key: "6", text: "C++ interview" },
        ],
      },
      {
        id: 789,
        name: "wstatus",
        label: "Status",
        placeholder: "Waiting status",
        options: [
          { key: "4", text: "Registered" },
          { key: "5", text: "Awaiting HR interview" },
          { key: "6", text: "Waiting Desicion" },
        ],
      },
    ];
  }, []);

  return (
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
    </Stack>
  );
};