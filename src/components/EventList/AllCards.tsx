import React, { useEffect } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import "./AllCards.scss";
import { useAuth, useEvents, useStore } from "../../hooks/hooks";
import Wrapper from "../UI/Wrapper/Wrapper";

export const AllCards: React.FC = () => {
  const { events, loading, fechEvents } = useEvents();
  const { isAuth } = useAuth();
  useEffect(() => {
    fechEvents();
  }, []);
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <Wrapper>
        <section className="all-cards__wrapper">
          {isAuth && <NewCardItem />}
          {Object.keys(events).map((id) => (
            <CardItem cardItem={events[id]} key={id} isLogged={isAuth} />
          ))}
        </section>
        <div className="margin2em button_center">
          <PrimaryButton text="Load More" className="button" />
        </div>
      </Wrapper>
    </>
  );
};
