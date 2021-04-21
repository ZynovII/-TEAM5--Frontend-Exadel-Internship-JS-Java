import React from "react";
import {
  TextField,
  Stack,
  mergeStyleSets,
  Dropdown,
  IDropdownOption,
  ProgressIndicator,
  DatePicker,
  PrimaryButton,
} from "@fluentui/react/lib";
import { AcceptStatus, IApplicant, InterviewStatus } from "../../models/IApplicant";
import { CandidateForm } from './CandidateForm'

export interface ICandidatProps {
  candidat: IApplicant;
}

const options: { key: string; text: string }[] = [
  { key: "Interview", text: "Interview" },
  { key: "HR", text: "HR" },
  { key: "TS", text: "TS" },
];

const dayPickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDays: ["S", "M", "T", "W", "T", "F", "S"],
  goToToday: "Go to today",
  weekNumberFormatString: "Week number {0}",
  prevMonthAriaLabel: "Previous month",
  nextMonthAriaLabel: "Next month",
  prevYearAriaLabel: "Previous year",
  nextYearAriaLabel: "Next year",
  prevYearRangeAriaLabel: "Previous year range",
  nextYearRangeAriaLabel: "Next year range",
  closeButtonAriaLabel: "Close",
  monthPickerHeaderAriaLabel: "{0}, select to change the year",
  yearPickerHeaderAriaLabel: "{0}, select to change the month",
};

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
const filterDisplay = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: -21,
  zIndex: 1,
} as const;
const candidat = 
  {
    id: "aefo78a0",
    fullName: "Ivan Ivanov",
    email: "iivanov@mail.ru",
    skype: " ",
    phoneNumber: "+375294722147",
    country: "Belarus",
    city: "Minsk",
    technology: "Java",
    event: "E-learning",
    summary: " ",
    acceptanceStatus: AcceptStatus.Accepted,
    interviewStatus: InterviewStatus.AwaitingHRInterview,
    interviewDate: "03.24.2021",
    interviewTime: "11:00",
    assignedHRID: "111",
    assignedTSID: "999",
    HRFeedback: "",
    TSFeedback: "",
  };


  const desicion: IDropdownOption[] = [
    { key: "Accept", text: "Accept" },
    { key: "Reject", text: "Reject" },
  ];
  
export const CandidatePage: React.FC = (props) => {
  
  return (
    <>
      <header className={contentStyles.title}>
        <div style={{display: 'flex', justifyContent:"space-between", width: '25%', alignItems:'center'}}>
          <h3>{candidat.fullName}</h3>
          <PrimaryButton text='Редактировать' />
        </div>
        <h3>Internship JS&amp;Java</h3>
      </header>
      <div className={contentStyles.container}>
      <div>
          <Stack
            className={contentStyles.formWrapper}
            horizontal
            tokens={{ childrenGap: "40px" }}
          >
            <Stack
              tokens={{ childrenGap: "10px" }}
              styles={{ root: { width: "220px" } }}
            >
              <h3
                style={{
                  color:
                    (candidat.acceptanceStatus ===
                      AcceptStatus.Accepted &&
                      "#00cc00") ||
                    (candidat.acceptanceStatus === AcceptStatus.Pending &&
                      "#DBDE36") ||
                    (candidat.acceptanceStatus ===
                      AcceptStatus.Rejected &&
                      "red"),
                }}
              >
                {candidat.acceptanceStatus}
              </h3>
            </Stack>
            <Stack
              tokens={{ childrenGap: "0px" }}
              styles={{ root: { width: "520px" } }}
            >
              <div style={filterDisplay}>
                <p>Registered</p>
                <p>Waiting HR</p>
                <p>Waiting TS</p>
                <p>Waiting desicion</p>
              </div>
              <ProgressIndicator
                barHeight={20}
                percentComplete={0.4}
                styles={{ root: { position: "relative" } }}
              />
            </Stack>
            <Stack
              tokens={{ childrenGap: "20px" }}
              styles={{ root: { width: "220px" } }}
            >
              <Dropdown
                placeholder="Select a desition"
                options={desicion}
                styles={{ root: { width: "220px" } }}
              />
            </Stack>
          </Stack>
          {<CandidateForm candidat={ candidat }/>}
          </div>
        
        <div>
          <h1>To set up iterview</h1>
          <Stack
            className={contentStyles.formWrapper}
            horizontal
            tokens={{ childrenGap: "40px" }}
          >
            <Stack
              tokens={{ childrenGap: "40px" }}
              styles={{ root: { width: "520px" } }}
            >
              <Dropdown
                placeholder="Select an option"
                label="Select type of interview"
                options={options}
              />
            </Stack>
            <Stack
              tokens={{ childrenGap: "0px" }}
              styles={{ root: { width: "520px" } }}
            >
              <DatePicker
                label="Chosen date "
                showMonthPickerAsOverlay={true}
                strings={dayPickerStrings}
                placeholder="Select a date..."
                ariaLabel="Select a date"
              />
            </Stack>
            <Stack
              tokens={{ childrenGap: "20px" }}
              styles={{ root: { width: "520px" } }}
            >
              <Dropdown
                label="Chosen tine "
                placeholder="Select an option"
                options={time}
              />
            </Stack>
          </Stack>
        </div>
      </div>
    </>
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
    margin: "2em",
  },
});
