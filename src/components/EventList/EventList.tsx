import React, { useEffect, useState } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import "./AllCards.scss";
import { useLoader } from "../../hooks/hooks";
import { useEvents } from "../../hooks/useEvents";
import { useAuth } from "../../hooks/useAuth";
import { useIsMountedRef } from "../../hooks/useIsMounted";

const EVENTS_SIZE = 6;

const EventList: React.FC<{ isAdminPage: boolean }> = ({ isAdminPage }) => {
  const {
    events,
    publishedEvents,
    fetchEvents,
    fetchPublishedEvents,
  } = useEvents();
  const { loading, showLoader } = useLoader();
  const [page, setPage] = useState<number>(0);
  const { isAuth } = useAuth();
  const isMountedRef = useIsMountedRef();

  const loadMore = (page: number, size: number) => {
    isAdminPage
      ? fetchEvents(page, size).then((cb) => {
          if (isMountedRef.current) cb();
        })
      : fetchPublishedEvents(page, EVENTS_SIZE).then((cb) => {
          if (isMountedRef.current) cb();
        });
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    showLoader();
    loadMore(page, EVENTS_SIZE - 1);
  }, []);

  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <section className="all-cards__wrapper">
        {isAdminPage && isAuth && <NewCardItem />}
        {Object.values(isAdminPage ? events : publishedEvents).map((item) => (
          <CardItem
            cardItem={item}
            key={item.id}
            isLogged={isAuth}
            isAdminPage={isAdminPage}
          />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton
          text="Load More"
          className="button"
          onClick={() => loadMore(page, EVENTS_SIZE)}
        />
      </div>
    </>
  );
};

export default EventList;
