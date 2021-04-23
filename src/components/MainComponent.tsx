import React from "react";
import FilterAll from "./Filter/FilterAll";
import { AllCards } from "./EventList/AllCards";
import Wrapper from './UI/Wrapper/Wrapper';

const MainComponent: React.FC = () => {
  return (
    <main className="main">
      <Wrapper>
        <h1 style={{ textAlign: "center" }}>
          You can start your career <br />
          with Exadel
        </h1>
        <h2 className="title">Filter</h2>
        <FilterAll />
        <h2 className="title">All Events</h2>
        <AllCards />
      </Wrapper>
    </main>
  );
};

export default MainComponent;
