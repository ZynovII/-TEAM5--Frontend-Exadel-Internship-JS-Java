import React, { useMemo } from "react";
import {
  Stack,
  PrimaryButton,
  IStackStyles,
  IDropdownStyles,
  IStackItemStyles,
} from "@fluentui/react";
import { IFilterDropdownItem, IFilterData } from "../Filter/Models";
import { useForm } from "react-hook-form";
import {
  ControlledDropdown,
} from "../../hook-form/Controlled";

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

export const ArchiveFilters: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFilterData>({
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
        name: "speciality",
        placeholder: "All",
        label: "Speciality",
        options: [
          { key: "JavaScript", text: "JavaScript" },
          { key: "Java", text: "Java" },
          { key: "DataScience", text: "DataScience" },
          { key: "C++", text: "C++" },
        ],
      },
      {
        id: "4",
        key: "4",
        name: "time",
        placeholder: "All",
        label: "Time",
        options: [
          { key: "2020", text: "2020" },
          { key: "2019", text: "2019" },
          { key: "2018", text: "2018" },
          { key: "2017", text: "2017" },
        ],
      },
    ];
  }, []);

  return (
    <>
      <Stack styles={stackStyles} horizontal verticalAlign="end" wrap>
        
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
        <ControlledDropdown
          {...filters[3]}
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

export default ArchiveFilters;
