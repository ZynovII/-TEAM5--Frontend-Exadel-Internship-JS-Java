import React from 'react'

import { DescriptionEventPage } from "./DescrioptionEventPage/DescriptionEvenPage";
import { Registration } from "./Registration/Registration";

 
const Event: React.FC = () => {
  return (
    <main>
        <h1 style={{textAlign:'center'}}>Internship JS & Java</h1>
        <DescriptionEventPage />
        <Registration
          id='1' 
          name= 'Apply for Internship JS & Java' 
          country={['Russia','Belarus']}
          technology = {['js','java']}
          ></Registration> 
    </main>
  )
}

export default Event