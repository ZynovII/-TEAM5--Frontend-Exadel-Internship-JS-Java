import React, { useEffect } from "react";
import { CardItem } from "./EventCard";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";

import "./AllCards.scss";
import { useEvents } from "../../hooks/hooks";

export const AllCards: React.FC = () => {
  const { events, loading } = useEvents();

  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <section className="all-cards__wrapper">
        {events.map((obj) => (
          <CardItem cardItem={obj} key={obj.id} />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton text="Load More" className="button" />
      </div>
    </>
  );
};
