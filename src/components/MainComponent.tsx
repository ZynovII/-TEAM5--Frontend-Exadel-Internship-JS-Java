import React from 'react'
import AllFilters from "./Filter/FilterAll";
import { AllCards } from "./EventList/AllCards";

const MainComponent: React.FC = () => {
  return (
    <main>
        <h1 style={{textAlign:'center'}}>You can start your career <br />with Exadel</h1>
        <h2 className="title">Filter</h2>
        {/* <AllFilters /> */}
        <h2 className="title">All Events</h2>
        <AllCards />
    </main>
  )
}

export default MainComponent