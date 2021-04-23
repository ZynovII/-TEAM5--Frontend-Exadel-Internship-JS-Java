import React from "react";
import { getTheme } from "@fluentui/react";
import { IEvent } from "../../models/IEvent";

const theme = getTheme();
const styles: { img: React.CSSProperties; div: React.CSSProperties } = {
  img: {
    paddingTop: 5,
    width: 520,
    maxWidth: "100%",
    height: "auto",
    display: "block",
    paddingBottom: 5,
    float: "left",
    marginRight: "1rem",
  },
  div: {
    margin: "0 auto 140px",
  },
};

export interface ICardItemProps {
  cardItem: IEvent;
}
const eventImg = require("./../../assets/img/event_img.jpg");

export const DescriptionEventPage: React.FC<ICardItemProps> = (props) => {
  console.log(props.cardItem);
  return (
    <div
      style={{
        boxShadow: theme.effects.elevation64,
        margin: "0 auto",
      }}
    >
      <img style={styles.img} src={eventImg.default} alt="event" />

      {/* <p>{props.cardItem.description}</p> */}
      <p style={{ padding: "1rem", textAlign: "justify" }}>
        {props.cardItem?.description}
        <br />
        {props.cardItem?.locations.map((el) => el.city + "")}
        <br />
        {props.cardItem?.startDate}
        <br />
        {props.cardItem?.technology}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
        tempore quo perspiciatis quia hic. Maiores libero fugiat officia in ab
        reiciendis, animi, blanditiis eligendi dolorum eius, ipsam architecto
        dolor quo!Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Veritatis tempore quo perspiciatis quia hic. Maiores libero fugiat
        officia in ab reiciendis, animi, blanditiis eligendi dolorum eius, ipsam
        architecto dolor quo!Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Veritatis tempore quo perspiciatis quia hic. Maiores libero fugiat
        officia in ab reiciendis, animi, blanditiis eligendi dolorum eius, ipsam
        architecto dolor quo!Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Veritatis tempore quo perspiciatis quia hic. Maiores libero fugiat
        officia in ab reiciendis, animi, blanditiis eligendi dolorum eius, ipsam
        architecto dolor quo!
      </p>
      <div style={{ clear: "both" }}></div>
    </div>
  );
};
