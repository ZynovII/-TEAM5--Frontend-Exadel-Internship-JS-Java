import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Spinner, SpinnerSize } from "@fluentui/react";

import { useLoader } from "../hooks/hooks";
import { useEvents } from "../hooks/useEvents";
import { IEvent } from "../models/IEvent";

import { DescriptionEventPage } from "./DescrioptionEventPage/DescriptionEvenPage";
import { Registration } from "./Registration/Registration";

export interface IEventProps {
  data: IEvent;
}
interface RouteParams {
  id: string;
}

const Event: React.FC<IEventProps> = (props) => {
  const params = useParams<RouteParams>();
  const { selectedEvent, selectEvent } = useEvents();
  const { loading, showLoader } = useLoader();

  useEffect(() => {
    showLoader();
    selectEvent(params.id);
    return () => selectEvent(null);
  }, []);
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <DescriptionEventPage cardItem={selectedEvent} />
      <Registration name={selectedEvent.name} techs={selectedEvent.techs} />
    </>
  );
};

export default Event;
