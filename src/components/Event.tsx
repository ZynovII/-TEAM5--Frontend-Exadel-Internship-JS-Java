import React from "react";
import { IEvent } from "../models/IEvent";

import { DescriptionEventPage } from "./DescrioptionEventPage/DescriptionEvenPage";
import { Registration } from "./Registration/Registration";

export interface IEventProps {
  data: IEvent;
}

const Event: React.FC<IEventProps> = (props) => {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "1em" }}>
        Internship JS & Java
      </h1>
      <DescriptionEventPage cardItem={props.data} />
      <Registration name="Js && Java" />
    </>
  );
};

export default Event;
