import React, { useEffect, useState } from "react";
import { CardItem } from "./EventCard";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";

import "./AllCards.scss";
import { useEvents } from "../../hooks/hooks";

export const AllCards: React.FC = () => {
  const { events, loading, fechEvents } = useEvents();
  useEffect(() => {
    fechEvents();
  }, []);
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <section className="all-cards__wrapper">
        {Object.keys(events).map((id) => (
          <CardItem cardItem={events[id]} key={id} />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton text="Load More" className="button" />
      </div>
    </>
  );
};
