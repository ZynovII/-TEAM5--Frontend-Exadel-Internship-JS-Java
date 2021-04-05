import React from "react";
import { IFilterItem, DropdownControlledExample } from "./FilterItem";

const filters = [
  {
    id: 1,
    placeholder: 'All',
    label: 'Event type',
    options: [{key: 'Meet-up', text: 'Meet-up'}, {key: 'Training', text: 'Training'}, {key: 'Internship', text: 'Internship'}],
    
},
{
    id: 2,
    placeholder: 'All',
    label: 'Speciality',
    options: [{key: 'HR', text: 'HR'}, {key: 'DevOps', text: 'DevOps'}],
    
},
{
    id: 3,
    placeholder: 'All',
    label: 'Locations',
    options: [{key: 'USA', text: 'USA'}, {key: 'Belarus', text: 'Belarus'}, {key: 'Russia', text: 'Russia'}, {key: 'Ukraine', text: 'Ukraine'}],
    
}
]

const filterDisplay = {
    display: 'flex',
    paddingLeft: '121px',
    paddingRight: '121px'

} as const;
const filterPadding = {
    paddingRight: '121px',

} as const;

export const AllFilters : React.FC = ()=> {
    return (
        <section style={filterDisplay}>
            {filters.map((obj: IFilterItem)=><div style={filterPadding}><DropdownControlledExample key={obj.id } filterItem={obj}/></div>)}
         </section>
        
    );
}
export default AllFilters