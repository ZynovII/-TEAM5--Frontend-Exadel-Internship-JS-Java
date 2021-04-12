import React from "react";
import { ApplicantListFilter, IFilterList } from "./ApplicantListFilter";

const filters = [
  {
    id: 123,
    placeholder: "All events",
    option: [
      { key: "4", text: "Internship JS & Java" },
      { key: "5", text: "Business Analysis Meet UP" },
      { key: "6", text: "C++ interview" }
    ]
  },
  {
    id: 456,
    placeholder: "All skills",
    option: [
      { key: "1", text: "JavaScript" },
      { key: "2", text: "Java" },
      { key: "3", text: "Business Analysis" }
    ]
  },
  {
    id: 789,
    placeholder: "Waiting status",
    option: [
      { key: "4", text: "Registered" },
      { key: "5", text: "Awaiting HR interview" },
      { key: "6", text: "Waiting Desicion" }
    ]
  }
];

const styles = {
  section: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    paddingRight: 50,
    paddingBottom: 30,
    backgroundColor: "#f9f9f8"
  }
};
export const AllApplicantFilter: React.FC = () => {
  return (
    <section style={styles.section}>
      {filters.map((obj: IFilterList) => (
        <ApplicantListFilter key={obj.id} listFilter={obj} />
      ))}
    </section>
  );
};
