import React from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  Image,
  ImageFit,
  Text,
} from "@fluentui/react";

import { useHistory } from "react-router";

const cardImage = require("./../../assets/img/plus.svg");

const styles = {
  styleCard: {
    root: {
      minWidth: '30%',
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: "20px",
      boxShadow: '0px 0px 36px -6px rgba(34, 60, 80, 0.1) inset',
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
};


export const NewCardItem: React.FC = (props) => {
  const history = useHistory();

  return (
    <DocumentCard
      styles={styles.styleCard}
      onClick={() => history.push('/')}
    >
      <div>
      <Image height='100%' width='100%' imageFit={ImageFit.cover} src={cardImage.default} />
      <DocumentCardTitle
        title="Add new event..."
        showAsSecondaryTitle
        styles={styles.title}
      />
      <DocumentCardTitle
        styles={styles.mainTytle}
        title=""
      />
      </div>
    </DocumentCard>
  );
};
