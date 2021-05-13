import React from "react";
import { getTheme, mergeStyleSets } from "@fluentui/react";
import { IEvent } from "../../models/IEvent";
import { dateReformer } from "./../../utils/stringReformers";
const theme = getTheme();

export interface ICardItemProps {
  cardItem: IEvent;
}
const eventImg = require("./../../assets/img/event_img.jpg");

export const DescriptionEventPage: React.FC<ICardItemProps> = (props) => {
  return (
    <div className={contentStyles.descriptionWrapper}>
       <h1 style={{ textAlign: "center", marginBottom: "1em", color: "#0276B4", }}>
        {props.cardItem.name}
      </h1>
      <div className={contentStyles.flexWrapper}>
        <div className={contentStyles.boxWrapper}>
          <h3 className={contentStyles.descHeader}>Technologies used</h3>
          {props.cardItem?.techs.map((el) => {return <span className={contentStyles.techSpan}><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i>{el.name + "  "}</span>})}
        </div>
        <div className={contentStyles.boxWrapper}>
          <h3 className={contentStyles.descHeader}>Start date</h3>
          {dateReformer(props.cardItem?.startDate)}
        </div>
      </div>
      <div>
        <h2 className={contentStyles.descHeader}>About event</h2>
        {props.cardItem?.description}
      </div>
      
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
      margin: "0 auto",
    },
  },
  descriptionWrapper: {
    boxShadow: theme.effects.elevation64,
    margin: "0 auto",
    padding: "2rem",
    "@media(max-width: 875px)": {
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      padding: "0",
    },
  },
  descHeader: {
    color: "#0276B4",
    margin: "1rem 0 1rem 0",
    textAlign: "center"
  },
  flexWrapper: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-around"
  },
  boxWrapper: {
    width: "40%",
    border: "2px solid lightblue",
    padding: "0 1rem 1rem",
    textAlign: "center"
  },
  "techSpan": {
    marginRight: "1rem"
  }
});
