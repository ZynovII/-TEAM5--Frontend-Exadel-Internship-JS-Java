import React, { useEffect } from "react";
import { CardItem } from "./EventCard";
import { PrimaryButton, Spinner, SpinnerSize } from "@fluentui/react";

import "./AllCards.scss";

import { useStore } from "../../context/context";
import { ActionTypes } from "../../context/actionTypes";
import { fakeRequestEvents } from "../../fakeDB/fakeRequest";

export const AllCards: React.FC = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    dispatch({
      type: ActionTypes.SHOW_LOADER,
    });
    fakeRequestEvents.then((res) => {
      dispatch({
        type: ActionTypes.FETCH_EVENTS,
        payload: JSON.parse(res),
      });
    });
  }, []);
  return state.loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <section className="all-cards__wrapper">
        {state.events.map((obj) => (
          <CardItem cardItem={obj} key={obj.id} />
        ))}
      </section>
      <div className="margin2em button_center">
        <PrimaryButton text="Load More" className="button" />
      </div>
    </>
  );
};
