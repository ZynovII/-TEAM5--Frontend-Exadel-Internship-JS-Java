import React from "react";
import FilterAll from "./Filter/FilterAll";
import EventList from "./EventList/EventList";

const MainComponent: React.FC = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        You can start your career <br />
        with Exadel
      </h1>
      <h2 className="title">Filter</h2>
      <FilterAll />
      <h2 className="title">All Events</h2>
      <EventList isAdminPage={false}/>
    </>
  );
};

export default MainComponent;
