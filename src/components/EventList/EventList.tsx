import React, { useEffect, useState } from "react";
import { CardItem } from "./EventCard";
import { NewCardItem } from "../NewEvent/NewCardItem";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";

import { useLoader } from "../../hooks/hooks";
import { useEvents } from "../../hooks/useEvents";
import { useAuth } from "../../hooks/useAuth";
import { useIsMountedRef } from "../../hooks/useIsMounted";
import EventFilters from "../Filter/EventFilters";
import { useOptions } from "../../hooks/useOptions";
import { IOptionsEventFilter } from "../../models/Forms/IOptions";
import { toDropdownOptions } from "../../utils/toDropdownOptions";
import {
  eventStatusReformer,
  eventTypeReformer,
} from "../../utils/stringReformers";
import { toTagsOptions } from "../../utils/toTagsOptions";
import { EventStatus } from "../../models/IEvent";

import "./AllCards.scss";
import { IFilterToRequest } from "../Filter/Models";

export const EVENTS_SIZE = 6;

const EventList: React.FC<{ isAdminPage: boolean }> = ({ isAdminPage }) => {
  const [options, setOptions] = useState<IOptionsEventFilter>({
    locations: [],
    eventTypes: [],
    techTags: [],
  });
  const { events, publishedEvents, fetchEvents } = useEvents();
  const { fetchEventFilters } = useOptions();
  const { loading, showLoader } = useLoader();
  const [page, setPage] = useState<number>(0);
  const { isAuth } = useAuth();
  const isMountedRef = useIsMountedRef();

  const loadMore = (page: number, size: number, filters?: IFilterToRequest) => {
    const args = isAdminPage
      ? [size, filters]
      : [EVENTS_SIZE, filters, EventStatus.Published];
    fetchEvents(page, ...args).then((cb) => {
      if (isMountedRef.current) cb();
    });

    setPage((prev) => prev + 1);
  };
  const loadFiltered = (filters: IFilterToRequest) => {
    setPage(0);
    loadMore(0, EVENTS_SIZE - 1, filters);
  };
  useEffect(() => {
    showLoader();
    fetchEventFilters().then((res) => {
      const options: IOptionsEventFilter = {
        eventTypes: toDropdownOptions(res.type, eventTypeReformer),
        locations: toDropdownOptions(res.country),
        techTags: toTagsOptions(res.tech),
        statuses: toDropdownOptions(res.status, eventStatusReformer),
      };
      if (isMountedRef.current) {
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
        fetchEvents={loadFiltered}
      />
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
