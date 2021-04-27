import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Spinner, SpinnerSize } from "@fluentui/react";

import { useEvents, useLoader } from "../hooks/hooks";
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
  const load = () => {
    showLoader();
    selectEvent(params.id);
  };
  useEffect(() => {
    load();
  }, []);
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "1em" }}>
        {selectedEvent.name}
      </h1>
      <DescriptionEventPage cardItem={selectedEvent} />
      <Registration name={selectedEvent.name} />
    </>
  );
};

export default Event;
