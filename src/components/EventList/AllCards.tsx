import React from "react";
import { CardItem, ICardItemInfo } from "./EventCard";
import { PrimaryButton } from "@fluentui/react";
import "./AllCards.scss";
import { IEvent } from "../../models/IEvent";

const events = [
  {
    id: 1,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus1",
  },
  {
    id: 2,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus2",
  },
  {
    id: 3,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus3",
  },
  {
    id: 4,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus4",
  },
  {
    id: 5,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus5",
  },
  {
    id: 6,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus6",
  },
];
interface IAllCardsProps {
  data: IEvent[];
}

export const AllCards: React.FC<IAllCardsProps> = (props) => {
  const events = props.data;
  return (
    <React.Fragment>
      <section className="all-cards__wrapper">
        {events.map((obj) => (
          <CardItem cardItem={obj} key={obj.id} />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton text="Load More" className="button" />
      </div>
    </React.Fragment>
  );
};
