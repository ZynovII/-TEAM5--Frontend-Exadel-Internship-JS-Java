import React, { useState } from "react";
import { CardItem } from "./EventCard";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";

import "./AllCards.scss";
import { useEvents } from "../../hooks/hooks";

export const AllCards: React.FC = () => {
  const { events, loading } = useEvents();
  const [length, setLength] = useState(6);

  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <section className="all-cards__wrapper">
        {events.slice(0, length).map((obj) => (
          <CardItem cardItem={obj} key={obj.id} />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton
          text="Load More"
          className="button"
          onClick={() => setLength(length + 6)}
        />
      </div>
    </>
  );
};
