import React, { useEffect, useState } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";
import "./AllCards.scss";
import { useLoader } from "../../hooks/hooks";
import { useEvents } from "../../hooks/useEvents";
import { useAuth } from "../../hooks/useAuth";
import { useIsMountedRef } from "../../hooks/useIsMounted";
import EventFilters from "../Filter/EventFilters";
import { useOptions } from "../../hooks/useOptions";
import { IOptionsEventFilter } from "../../models/Forms/IOptions";
import { toDropdownOptions } from "../../utils/toDropdownOptions";
import { eventStatusReformer } from "../../utils/stringReformers";

export const EVENTS_SIZE = 6;

const EventList: React.FC<{ isAdminPage: boolean }> = ({ isAdminPage }) => {
  const [options, setOptions] = useState<IOptionsEventFilter>({
    locations: [],
    eventTypes: [],
    techTags: [],
  });
  const {
    events,
    publishedEvents,
    fetchEvents,
    fetchPublishedEvents,
  } = useEvents();
  const {
    fetchLocation,
    fetchEventTypes,
    fetchTechnology,
    fetchEventFilters,
  } = useOptions();
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
    Promise.all([
      fetchEventTypes(),
      fetchLocation(),
      fetchTechnology(),
      fetchEventFilters(),
    ]).then((res) => {
      const options: IOptionsEventFilter = {
        eventTypes: res[0],
        locations: res[1],
        techTags: res[2],
        statuses: toDropdownOptions(res[3].status, eventStatusReformer),
      };
      if (isMountedRef) {
        setOptions(options);
      }
    });
    loadMore(page, EVENTS_SIZE - 1);
  }, []);

  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <EventFilters
        isAdminPage={isAdminPage}
        options={options}
        fetchEvents={fetchPublishedEvents}
      />
      <br />
      <section className="all-cards__wrapper">
        {isAdminPage && isAuth && <NewCardItem />}
        {Object.values(isAdminPage ? events : publishedEvents).map((item) => (
          <CardItem
            cardItem={item}
            key={item.id}
            isLogged={isAuth}
            isAdminPage={isAdminPage}
            loadMore={loadMore}
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
