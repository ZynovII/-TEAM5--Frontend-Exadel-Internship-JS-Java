import React, { useEffect } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import "./AllCards.scss";
import { useEvents, useStore } from "../../hooks/hooks";

export const AllCards: React.FC = () => {
  const { events, loading, fechEvents } = useEvents();
  const { state } = useStore(); // useAuth()
  useEffect(() => {
    fechEvents();
  }, []);
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
        <section className="all-cards__wrapper">
          {state.isAuthenticated && <NewCardItem />}
          {Object.keys(events).map((id) => (
            <CardItem
              cardItem={events[id]}
              key={id}
              isLogged={state.isAuthenticated}
            /> // useAuth()
          ))}
        </section>
        <div className="margin2em button_center">
          <PrimaryButton text="Load More" className="button" />
        </div>
    </>
  );
};
