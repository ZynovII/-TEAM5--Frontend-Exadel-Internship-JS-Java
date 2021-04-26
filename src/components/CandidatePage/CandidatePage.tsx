import React, { useState } from "react";
import {
  Stack,
  mergeStyleSets,
  Dropdown,
  DatePicker,
  DocumentCardActions,
} from "@fluentui/react";
import {
  AcceptStatus,
  IApplicant,
  InterviewStatus,
  PreferredTime,
} from "../../models/IApplicant";
import { Registration } from "../Registration/Registration";
import { StatusForm } from "./StatusForm";
import { InfoForm } from "./InfoForm";

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

const candidat: IApplicant = {
  id: "aefo78a0",
  fullName: "Ivan Ivanov",
  email: "iivanov@mail.ru",
  skype: " skype ",
  phoneNumber: "+375294722147",
  country: "Belarus",
  city: "Minsk",
  technology: "Java",
  event: "E-learning",
  summary:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure idLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id..",
  acceptanceStatus: AcceptStatus.Accepted,
  interviewStatus: InterviewStatus.AwaitingTSInterview,
  preferredTime: PreferredTime.First,
};

export const CandidatePage: React.FC = (props) => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <>
      <header className={contentStyles.title}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "20%",
            alignItems: "flex-end",
          }}
        >
          <h2>{candidat.fullName}</h2>
          <DocumentCardActions
            actions={[
              {
                iconProps: { iconName: "Edit" },
                ariaLabel: "edit event",
                onClick: () => setEdit(!edit),
              },
            ]}
          />
        </div>
        <h3>Internship JS&amp;Java</h3>
      </header>
      <div className={contentStyles.container}>
        <div>
          <StatusForm candidat={candidat} />
          {edit ? (
            <Registration candidatePage={true} candidat={candidat} />
          ) : (
            <InfoForm candidat={candidat} />
          )}
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
    margin: "1em 2em",
  },
});
