import React, { useEffect, useMemo } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import "./AllCards.scss";
import { useLoader } from "../../hooks/hooks";
import { useEvents } from "../../hooks/useEvents";
import { useAuth } from "../../hooks/useAuth";

const EventList: React.FC<{ isAdminPage: boolean }> = ({ isAdminPage }) => {
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
        {isAdminPage && isAuth && <NewCardItem />}
        {Object.values(events).map((item) => (
          <CardItem
            cardItem={item}
            key={item.id}
            isLogged={isAuth}
            isAdminPage={isAdminPage}
          />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton text="Load More" className="button" onClick={loadMore} />
      </div>
    </>
  );
};

export default EventList;
