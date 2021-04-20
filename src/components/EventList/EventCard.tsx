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

const cardImage = require("./../../assets/img/card_img.jpg");

const styles = {
  styleCard: {
    root: {
      paddingBottom: "10px",
      marginBottom: "20px",
    },
  },
  mainTytle: {
    root: {
      height: "35px",
      lineHeight: "35px",
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
    paddingLeft: "20px",
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

  return (
    <DocumentCard
      styles={styles.styleCard}
      onClick={() => history.push(`/events/${props.cardItem.name}`)}
    >
      {props.isLogged && <DocumentCardActions actions={documentCardActions} />}
      <Image height={150} imageFit={ImageFit.cover} src={cardImage.default} />
      <DocumentCardTitle
        styles={styles.mainTytle}
        title={props.cardItem.name}
      />
      <DocumentCardTitle
        title={props.cardItem.date}
        showAsSecondaryTitle
        styles={styles.title}
      />
      <Text style={styles.text}>{props.cardItem.country}</Text>
    </DocumentCard>
  );
};
