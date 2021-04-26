import React, { useEffect } from "react";
import { useParams } from "react-router";
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
  useEffect(() => {
    showLoader();
    selectEvent(params.id);
  }, []);
  console.log(selectedEvent, loading);
  return loading ? (
    <main className="main">
      <h1>HHH</h1>
    </main>
  ) : (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "1em" }}>
        {selectedEvent.name}
      </h1>
      <DescriptionEventPage cardItem={props.data} />
      <Registration name={selectedEvent.name} />
    </>
  );
};

export default Event;
