import React from 'react';
import {ApplicantListFilter, IFilterList} from "./ApplicantListFilter"

const filters = [
    {
      id: 123,
      placeholder: "All events",
      option: [{key:"4", text:"Internship JS & Java"}, {key:"5", text:"Business Analysis Meet UP"}, {key:"6", text: "C++ interview"}] 
    },
    {
      id: 456,
      placeholder: "All skills",
      option: [{key:"1", text:"JavaScript"}, {key:"2", text:"Java"}, "C++", {key:"3", text:"Business Analysis"}]
    },
    {  id: 789,
      placeholder: "Waiting status",
      option: [{key:"4", text:"Registered"}, {key:"5", text:"Awaiting HR interview"}, {key:"6", text:"Waiting Desicion"}]
    }
  ]

const styles = {
  section: {
    right: 0,
    maxWidth: "73%",
    display: "flex",
    justifyContent: "flex-end",
    margin: '0 auto',
    paddingRight: 100
  },
 } ;
export const AllApplicantFilter: React.FC = () => {
    return (
      <section style={styles.section} >
        {filters.map((obj: IFilterList) => <ApplicantListFilter key={obj.id} listFilter={obj} />)}
      </section>
    );
  };
