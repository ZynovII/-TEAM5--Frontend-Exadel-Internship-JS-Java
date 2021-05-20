import React, { useEffect, useState } from "react";
import { Stack, PrimaryButton, mergeStyleSets } from "@fluentui/react";
import { useForm } from "react-hook-form";
import {
  ControlledDropdown,
  ControlledDatePicker,
} from "../../hook-form/Controlled";
import { useInterviews } from "../../hooks/useInterviews";
import { IApplicantDetailsFromBackEnd } from "../../models/IApplicant";

const time = [
  {
    key: "09:00-09:30",
    text: "09:00-09:30",
  },
  {
    key: "10:00-10:30",
    text: "10:00-10:30",
  },
  {
    key: "10:30-11:00",
    text: "10:30-11:00",
  },
  {
    key: "11:00-11:30",
    text: "11:00-11:30",
  },
  {
    key: "12:00-12:30",
    text: "12:00-12:30",
  },
  {
    key: "13:00-13:30",
    text: "13:00-13:30",
  },
  {
    key: "14:00-14:30",
    text: "14:00-14:30",
  },
  {
    key: "15:00-15:30",
    text: "15:00-15:30",
  },
];
export const InterviewForm: React.FC<{
  candidat: IApplicantDetailsFromBackEnd;
}> = ({ candidat }) => {
  const {
    getRoles,
    getInterviewers,
    interviewers,
    createInterviews,
  } = useInterviews();
  const [roles, setRoles] = useState();
  const [interviewer, setInterviewer] = useState();
  const [disabledInterviewer, setDisabledInterviewer] = useState<boolean>(true);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  useEffect(() => {
    getRoles().then((res) =>
      setRoles(
        res.slice(0, length - 1).map((el) => {
          switch (el) {
            case "ADMIN":
              return { key: el, text: "HR" };
            case "TECH":
              return { key: el, text: "TS" };
            default:
              return { key: el, text: el };
          }
        })
      )
    );
    getInterviewers();
  }, []);

  const onSend = (candidate) => {
    handleSubmit((data) => {
      const startTime = data.timeInterview.join().slice(0, 5);
      const startDate = new Date(
        data.dateInterview.toString().replace(/00:00/, startTime)
      );
      createInterviews(candidate, data.interviewer[0], startDate);
    })();
  };
  const selectInterviewers = (type) => {
    const option = interviewers.filter((el) => el.name.includes(type)).shift()
      .employees;
    setInterviewer(option.map((el) => ({ key: el.id, text: el.fullName })));
  };

  return (
    <div>
      <h1 style={{ margin: "0.5em 0" }}>To set up iterview</h1>
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
            placeholder="Select type"
            defaultSelectedKey={""}
            errors={errors}
            options={roles}
            onChange={(e, data) => {
              setDisabledInterviewer(false);
              selectInterviewers(data.key);
            }}
          />
        </Stack>
        <Stack
          tokens={{ childrenGap: "0px" }}
          styles={{ root: { width: "520px" } }}
        >
          <ControlledDropdown
            control={control}
            label="Select Interviewer"
            name={"interviewer"}
            placeholder="Select interviewer"
            defaultSelectedKey={""}
            errors={errors}
            options={interviewer}
            disabled={disabledInterviewer}
          />
        </Stack>
        <Stack
          tokens={{ childrenGap: "20px" }}
          styles={{ root: { width: "520px" } }}
        >
          <ControlledDatePicker
            control={control}
            name={"dateInterview"}
            label="Select date"
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
            label="Select time"
            name={"timeInterview"}
            placeholder="Select an option"
            defaultSelectedKey={""}
            errors={errors}
            options={time}
          />
        </Stack>
      </Stack>
      <PrimaryButton
        text="Appoint"
        className="margin2em button_center button"
        onClick={() => onSend(candidat.id)}
      />
    </div>
  );
};

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
