import React from "react";
import { DropDownFilter, IFilterList } from "./DropDownFilter";

const filters = [
    {
        id: 456,
        placeholder: "Date of interniew",
        option: [
          { key: "1", text: "18.03.2021" },
          { key: "2", text: "18.03.2021" },
          { key: "3", text: "19.03.2021" },
          { key: "4", text: "19.03.2021" },
        ],
      },
    {
    id: 456,
    placeholder: "Time of interniew",
    option: [
      { key: "1", text: "18:00" },
      { key: "2", text: "15:00" },
      { key: "3", text: "10:00" },
      { key: "4", text: "16:00" },
    ],
  },
  {
    id: 123,
    placeholder: "All events",
    option: [
      { key: "4", text: "Internship JS & Java" },
      { key: "5", text: "Business Analysis Meet UP" },
      { key: "6", text: "C++ interview" },
    ],
  },
  {
    id: 789,
    placeholder: "Waiting status",
    option: [
      { key: "4", text: "Registered" },
      { key: "5", text: "Awaiting HR interview" },
      { key: "6", text: "Waiting Desicion" },
    ],
  },
];

const styles = {
  section: {
    right: 0,
    maxWidth: "73%",
    display: "flex",
    justifyContent: "spase-around",
    margin: "2rem auto",

  },
};
export const InterviewListFilter: React.FC = () => {
  return (
    <section style={styles.section}>
      {filters.map((obj: IFilterList) => (
        <DropDownFilter key={obj.id} listFilter={obj} />
      ))}
    </section>
  );
};
