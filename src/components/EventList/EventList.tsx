import React, { useEffect, useState } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import "./AllCards.scss";
import { useLoader } from "../../hooks/hooks";
import { useEvents } from "../../hooks/useEvents";
import { useAuth } from "../../hooks/useAuth";

const EventList
  : React.FC<{ isAdminPage: boolean }> = ({ isAdminPage }) => {
    const { events, publishedEvents, fetchEvents, fetchPublishedEvents } = useEvents();
    const { loading, showLoader } = useLoader();
    const [page, setPage] = useState(0)
    const { isAuth } = useAuth();
    const loadMore = (page, size) => {
      isAdminPage ? fetchEvents(page, size) : fetchPublishedEvents(page, 6);
      setPage(page+1)
    };
    
    useEffect(() => {
      showLoader();
      loadMore(page, 5)
    }, []);

    return loading ? (
      <Spinner size={SpinnerSize.large} className="margin2em" />
    ) : (
      <>
        <section className="all-cards__wrapper">
          {(isAdminPage) && isAuth && <NewCardItem />}
          {Object.values(isAdminPage ? events : publishedEvents).map((item) => (
            <CardItem cardItem={item} key={item.id} isLogged={isAuth} isAdminPage={isAdminPage} />
          ))}
        </section>
        <div className="margin2em button_center">
          <PrimaryButton text="Load More" className="button" onClick={() => loadMore(page, 6)} />
        </div>
      </>
    );
  };


export default EventList;
