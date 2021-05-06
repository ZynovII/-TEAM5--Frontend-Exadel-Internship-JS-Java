import React, { useMemo, useState } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  Image,
  ImageFit,
  Text,
  DocumentCardActions,
  mergeStyleSets,
  FontIcon,
  DialogType,
} from "@fluentui/react";

import { useBoolean } from "@fluentui/react-hooks";
import { useHistory } from "react-router";
import { IEvent } from "../../models/IEvent";
import { useLoader } from "../../hooks/hooks";
import { useEvents } from "../../hooks/useEvents";
import { PublishDialog } from "./PublishDialog";

import { dateReformer } from "./../../utils/stringReformers";

const cardImage = require("./../../assets/img/card_img.jpg");

const styles = mergeStyleSets({
  styleCard: {
    minWidth: "30%",
    height: 345,
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  mainTytle: {
    height: "20px",
    lineHeight: "20px",
  },
  title: {
    height: "25px",
    lineHeight: "25px",
    paddingBottom: 0,
    paddingTop: 0,
  },
  text: {
    paddingLeft: "15px",
    marginBottom: "10px",
  },
  acceptIcon: {
    color: "blue",
    fontSize: "40px",
    marginRight: "0.2rem",
  },
});

export interface ICardItemProps {
  cardItem: IEvent;
  isLogged: boolean;
  isAdminPage: boolean;
}

export const CardItem: React.FC<ICardItemProps> = (props) => {
  const history = useHistory();
  const { loadImage, replaceToArchive } = useEvents();
  const { showLoader } = useLoader();
  const selectHandler = () => {
    showLoader();
    history.push(`/events/${props.cardItem.id}`);
  };

  const [imageEvent, setImageEvent] = useState(
    "https://veraconsulting.it/wp-content/uploads/2014/04/placeholder.png"
  );
  React.useEffect(() => {
    loadImage(props.cardItem.id, setImageEvent);
  }, []);

  const [hidePublishDialog, { toggle: toggleHidePublishDialog }] = useBoolean(
    true
  );
  const [hideRemoveDialog, { toggle: toggleHideRemoveDialog }] = useBoolean(
    true
  );
  const [isPublished, setIspublished] = useState(false);
  const onClickPublishBtn = (e) => {
    isPublished ? setIspublished(false) : toggleHidePublishDialog();
    e.stopPropagation();
    e.preventDefault();
  };

  const onClickRemoveBtn = (e) => {
    toggleHideRemoveDialog();
    e.stopPropagation();
    e.preventDefault();
  };

  const handleArchiveBtn = (e) => {
    replaceToArchive(props.cardItem.id);
  };

  const apdateData = (value: boolean) => {
    setIspublished(value);
  };

  const documentCardActions = [
    {
      iconProps: { iconName: "Edit" },
      // onClick:
      ariaLabel: "edit event",
      title: "Edit event",
    },
    {
      iconProps: { iconName: "Delete" },
      onClick: onClickRemoveBtn,
      ariaLabel: "move to archive",
      title: "Move to archive",
    },
    {
      iconProps: {
        iconName: isPublished ? "UnpublishContent" : "PublishContent",
      },
      onClick: onClickPublishBtn,
      ariaLabel: "publish event",
      title: isPublished ? "Unpublish Event" : "Publish event",
    },
  ];

  const publishDialogProps = useMemo(() => {
    return {
      hideDialog: hidePublishDialog,
      toggleHideDialog: toggleHidePublishDialog,
      apdateData: apdateData,
      dialogContentProps: {
        type: DialogType.normal,
        title: "Attention",
        closeButtonAriaLabel: "Close",
        subText: "Are you sure you want to publish this event?",
      },
      actionType: "publish",
    };
  }, []);
  const removeDialogProps = useMemo(
    () => ({
      hideDialog: hideRemoveDialog,
      toggleHideDialog: toggleHideRemoveDialog,
      apdateData: handleArchiveBtn,
      dialogContentProps: {
        type: DialogType.normal,
        title: "Attention",
        closeButtonAriaLabel: "Close",
        subText: "Are you sure you want to remove this event?",
      },
      actionType: "remove",
    }),
    []
  );

  return (
    <DocumentCard className={styles.styleCard} onClick={selectHandler}>
      <div>
        {props.isAdminPage && props.isLogged && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DocumentCardActions actions={documentCardActions} />
            {isPublished ? (
              <FontIcon
                aria-label="Accept"
                iconName="Accept"
                className={styles.acceptIcon}
                title="Event is published"
              />
            ) : null}
          </div>
        )}
      </div>
      <PublishDialog {...removeDialogProps} />
      <PublishDialog {...publishDialogProps} />
      <Image height="65%" imageFit={ImageFit.cover} src={imageEvent} />
      {/* {imageEvent && <>PICTURE<Image src={imageEvent}/></>} */}
      <DocumentCardTitle
        className={styles.mainTytle}
        title={props.cardItem.name}
      />
      <DocumentCardTitle
        title={dateReformer(props.cardItem.startDate)}
        showAsSecondaryTitle
        className={styles.title}
      />
      <Text className={styles.text}>
        {props.cardItem.locations.map((el) => el.city + " ")}
      </Text>
    </DocumentCard>
  );
};
