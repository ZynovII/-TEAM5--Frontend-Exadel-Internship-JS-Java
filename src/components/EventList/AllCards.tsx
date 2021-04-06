import React, { useEffect, useState } from "react";
import { CardItem, ICardItemInfo } from "./EventCard";
import { PrimaryButton } from "@fluentui/react";
import "./AllCards.scss";
import { IEvent } from "../../models/IEvent";

interface IAllCardsProps {
  data: IEvent[];
}

export const AllCards: React.FC<IAllCardsProps> = (props) => {
  const events = props.data;
  const [length, setLength] = useState(6);

  return (
    <React.Fragment>
      <section className="all-cards__wrapper">
        {events.slice(0, length).map((obj) => (
          <CardItem cardItem={obj} key={obj.id} />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton text="Load More" className="button" onClick={() => setLength(length+6)}/>
      </div>
    </React.Fragment>
  );
};
