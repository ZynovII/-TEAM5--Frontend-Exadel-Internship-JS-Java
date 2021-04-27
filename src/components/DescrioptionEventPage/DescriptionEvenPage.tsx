import React from "react";
import { getTheme, mergeStyleSets } from "@fluentui/react";
import { IEvent } from "../../models/IEvent";

const theme = getTheme();

export interface ICardItemProps {
  cardItem: IEvent;
}
const eventImg = require("./../../assets/img/event_img.jpg");

export const DescriptionEventPage: React.FC<ICardItemProps> = (props) => {
  return (
    <div className={contentStyles.descriptionWrapper}
    >
      <img className={contentStyles.eventImg} src={eventImg.default} alt="event" />

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

const contentStyles = mergeStyleSets({
  eventImg: {
    paddingTop: 5,
    width: 520,
    maxWidth: "100%",
    height: "auto",
    display: "block",
    paddingBottom: 5,
    float: "left",
    marginRight: "1rem",
    "@media(max-width: 875px)": {
      margin: '0 auto'
    },
  },
  descriptionWrapper: {
    boxShadow: theme.effects.elevation64,
        width: "73%",
        margin: "0 auto",
        "@media(max-width: 875px)": {
          display: "flex",
          flexDirection: 'column',
          margin: "0 auto",
          padding: "0",
          maxWidth: "73%",
        },
  }

})