import React from "react";
import { getTheme } from "@fluentui/react";

const theme = getTheme();
const styles = {
  img: {
    paddingTop: 5,
    width: 520,
    maxWidth: "100%",
    height: "auto",
    display: "block",
    paddingBottom: 5,
    float: "left",
    marginRight: "1rem"
  },
  div: {
    margin: "0 auto 140px",
  },
};
export interface ICardItemInfo {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}
export interface ICardItemProps {
  cardItem: ICardItemInfo;
}
const eventImg = require("./../../assets/img/event_img.jpg");

export const DescriptionEventPage: React.FC<ICardItemProps> = (props) => {
  return (
    <div
      style={{
        boxShadow: theme.effects.elevation64,
        width: "73%",
        margin: "0 auto",
      }}
    >
      <img style={styles.img} src={eventImg.default} alt="event" />

      {/* <p>{props.cardItem.description}</p> */}
      <p style={{padding: "1rem", textAlign: "justify"}}>
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
      <div style={{clear:"both"}}></div>
    </div>
  );
};
