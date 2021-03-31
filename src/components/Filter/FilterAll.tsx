import React from 'react'
import { IFilterItem, DropdownControlledExample} from './FilterItem'



const filters = [{
    id: 1,
    placeholder: 'All',
    label: 'Event type',
    options: ['Meet-up', 'Training', 'Internship'],
    
},
{
    id: 2,
    placeholder: 'All',
    label: 'Speciality',
    options: ['HR', 'DevOps'],
    
},
{
    id: 3,
    placeholder: 'All',
    label: 'Locations',
    options: ['Belarus', 'Poland', 'Ucraine', 'Russia'],
    
}
]

const filterDisplay = {
    display: 'flex',
    paddingLeft: '121px',

} as const;

export const AllFilters : React.FC = ()=> {
    return (
        <section style={filterDisplay}>
            {filters.map((obj: IFilterItem)=><DropdownControlledExample filterItem={obj}/>)}
         </section>
        
    );
}
export default AllFilters