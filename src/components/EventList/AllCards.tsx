import React, { useEffect, useMemo } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import "./AllCards.scss";
import { useEvents, useAuth, useLoader } from "../../hooks/hooks";

export const AllCards: React.FC = () => {
  const { events, fetchEvents } = useEvents();
  const { loading, showLoader } = useLoader();
  const { isAuth } = useAuth();
  const loadMore = () => {
    fetchEvents(0, 0);
  };
  useEffect(() => {
    showLoader();
    loadMore();
  }, []);
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <section className="all-cards__wrapper">
        {isAuth && <NewCardItem />}
        {Object.values(events).map((item) => (
          <CardItem cardItem={item} key={item.id} isLogged={isAuth} />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton text="Load More" className="button" onClick={loadMore} />
      </div>
    </>
  );
};

export default AllCards;
