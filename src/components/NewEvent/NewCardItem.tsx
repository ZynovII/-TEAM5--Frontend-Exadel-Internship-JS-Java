import React, { useState } from "react";
import { NewEventForm } from "./NewEventForm";
import {
  DocumentCard,
  DocumentCardTitle,
  Image,
  ImageFit,
} from "@fluentui/react";

const cardImage = require("./../../assets/img/plus.svg");

const styles = {
  styleCard: {
    root: {
      width: "100%",
      maxWidth: "none",
      height: 35,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
      backgroundColor: "rgb( 190, 240, 190)",
      boxShadow: "0px 0px 36px -6px rgba(34, 60, 80, 0.1) inset",
      ":hover": {
        backgroundColor: "rgb( 200, 250, 200)",
      },
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
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => setIsModal((isModal) => !isModal);

  return (
    <>
      <DocumentCard styles={styles.styleCard} onClick={() => setIsModal(true)}>
        <DocumentCardTitle title="Add new event..." styles={styles.title} />
        {isModal && <NewEventForm isModal={isModal} hideModal={toggleModal} />}
      </DocumentCard>
    </>
  );
};
