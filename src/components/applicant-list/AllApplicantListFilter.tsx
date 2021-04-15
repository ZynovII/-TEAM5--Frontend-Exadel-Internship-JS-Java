import React from "react";
import { ApplicantListFilter, IFilterList } from "./ApplicantListFilter";
import {IStackStyles, Stack} from '@fluentui/react'

const stackStyles: IStackStyles = {
  root: {
    margin: "0 auto",
    width: "87%",
  },
};

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
    id: 417,
    placeholder: "Location",
    option: [
      { key: "4", text: "Qatar" },
      { key: "5", text: "Cameroon" },
      { key: "6", text: "Waiting Desicion" }
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


export const AllApplicantFilter: React.FC = () => {
  return (
    <Stack styles={stackStyles} horizontal horizontalAlign="space-between" wrap>
      {filters.map((obj: IFilterList) => (
        <ApplicantListFilter key={obj.id} listFilter={obj} />
      ))}
    </Stack>
  );
};
