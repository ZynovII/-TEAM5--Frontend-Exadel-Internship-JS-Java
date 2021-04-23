import React from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  Image,
  ImageFit,
  Text,
  DocumentCardActions,
} from "@fluentui/react";

import { useHistory } from "react-router";
import { IEvent } from "../../models/IEvent";
import { useEvents } from "../../hooks/hooks";

const cardImage = require("./../../assets/img/card_img.jpg");

const styles = {
  styleCard: {
    root: {
      minWidth: "30%",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
  },
  mainTytle: {
    root: {
      height: "20px",
      lineHeight: "20px",
    },
  },
  title: {
    root: {
      height: "25px",
      lineHeight: "25px",
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  text: {
    paddingLeft: "15px",
    marginBottom: "10px",
  },
};

const documentCardActions = [
  {
    iconProps: { iconName: "Edit" },
    // onClick:
    ariaLabel: "delete event",
  },
  {
    iconProps: { iconName: "Delete" },
    // onClick:
    ariaLabel: "edit event",
  },
];

export interface ICardItemProps {
  cardItem: IEvent;
  isLogged: boolean;
}

export const CardItem: React.FC<ICardItemProps> = (props) => {
  const history = useHistory();
  const { selectEvent } = useEvents();
  const selectHandler = () => {
    history.push(`/events/${props.cardItem.id}`);
  };

  return (
    <DocumentCard styles={styles.styleCard} onClick={selectHandler}>
      {props.isLogged && <DocumentCardActions actions={documentCardActions} />}
      <Image height="65%" imageFit={ImageFit.cover} src={cardImage.default} />
      <DocumentCardTitle
        styles={styles.mainTytle}
        title={props.cardItem.name}
      />
      <DocumentCardTitle
        title={props.cardItem.startDate}
        showAsSecondaryTitle
        styles={styles.title}
      />
      <Text style={styles.text}>
        {props.cardItem.locations.map((el) => el.city + " ")}
      </Text>
    </DocumentCard>
  );
};
