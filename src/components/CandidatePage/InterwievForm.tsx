import React from 'react'
import {
  Stack, 
  PrimaryButton,
  mergeStyleSets
} from '@fluentui/react'
import { useForm } from "react-hook-form";
import { ControlledDropdown, ControlledDatePicker } from '../../hook-form/Controlled'

const options: { key: string; text: string }[] = [
  { key: "Interview", text: "Interview" },
  { key: "HR", text: "HR" },
  { key: "TS", text: "TS" },
];
const Interviewer: { key: string; text: string }[] = [
  { key: "Misha", text: "Misha" },
  { key: "Petro", text: "Petro" },
  { key: "Yan", text: "Yan" },
];

const time = [
  {
    key: 1,
    text: "09:00-09:30",
  },
  {
    key: 2,
    text: "10:00-10:30",
  },
  {
    key: 3,
    text: "10:30-11:00",
  },
  {
    key: 4,
    text: "11:00-11:30",
  },
  {
    key: 5,
    text: "12:00-12:30",
  },
  {
    key: 6,
    text: "13:00-13:30",
  },
  {
    key: 7,
    text: "14:00-14:30",
  },
  {
    key: 8,
    text: "15:00-15:30",
  },
];
export const InterviewForm: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const onSend = () => {
    handleSubmit((data) => console.log(data))();
  };

  return (
    <div>
      <h1 style={{ margin: '0.5em 0' }}>To set up iterview</h1>
      <Stack
        className={contentStyles.formWrapper}
        horizontal
        tokens={{ childrenGap: "40px" }}
      >
        <Stack
          tokens={{ childrenGap: "40px" }}
          styles={{ root: { width: "520px" } }}
        >
          <ControlledDropdown
            control={control}
            label="Select type of interview"
            name={"typeInterview"}
            placeholder="Select an option"
            defaultSelectedKey={""}
            errors={errors}
            options={options}
          />
        </Stack>
        <Stack
          tokens={{ childrenGap: "0px" }}
          styles={{ root: { width: "520px" } }}
        >
          <ControlledDatePicker
            control={control}
            name={"dateInterview"}
            label="Choose date"
            showMonthPickerAsOverlay={true}
            placeholder="Select a date..."
            ariaLabel="Select a date"
          />
        </Stack>
        <Stack
          tokens={{ childrenGap: "20px" }}
          styles={{ root: { width: "520px" } }}
        >
          <ControlledDropdown
            control={control}
            label="Chosen time"
            name={"timeInterview"}
            placeholder="Select an option"
            defaultSelectedKey={""}
            errors={errors}
            options={time}
          />
        </Stack>
        <Stack
          tokens={{ childrenGap: "20px" }}
          styles={{ root: { width: "520px" } }}
        >
          <ControlledDropdown
            control={control}
            label="Chosen Interviewer"
            name={"interviewer"}
            placeholder="Select an option"
            defaultSelectedKey={""}
            errors={errors}
            options={Interviewer}
          />
        </Stack>
      </Stack>
      <PrimaryButton text="Appoint" className="margin2em button_center button" onClick={onSend} />
    </div>
  )
}


const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  title: {
    margin: "0 2em",
  },
  container: {
    width: "auto",
    margin: "1em 2em",
  },
});
