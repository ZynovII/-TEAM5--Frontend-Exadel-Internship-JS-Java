import React from "react";
import { CardItem, ICardItemInfo } from "./EventCard";
import "./AllCards.scss";

const events = [
  {
    id: 1,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus",
  },
  {
    id: 2,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus",
  },
  {
    id: 3,
    title: "Java&JavaScript",
    date: "01.03.2021-31.05.2021",
    location: "Belarus",
  },
];

export const AllCards: React.FC = () => {
  return (
    <section className="all-cards__wrapper">
      {events.map((obj: ICardItemInfo) => (
        <CardItem key={obj.id} cardItem={obj} />
      ))}
    </section>
  );
};
