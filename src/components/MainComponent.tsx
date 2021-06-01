import React from "react";
import EventList from "./EventList/EventList";

const MainComponent: React.FC = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        You can start your career <br />
        with Exadel
      </h1>
      <EventList isAdminPage={false} />
    </>
  );
};

export default MainComponent;
