import * as React from "react";
import "./styles/EventSubmit.scss";

import EventSubmitForm from "./EventSubmitForm/EventSubmitForm";
import IEventSubmit from "./IEventSubmit";
import { useEvents } from "../../hooks/useEvents";

const eventSubmit = (props) => {
  const [state, setState] = React.useState({
    showForm: false,
  });
  const { createEvent } = useEvents();

  const closeEvent = () => {
    setState({
      showForm: false,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    closeEvent();
    createEvent(event);
  };

  let form;
  if (state.showForm) {
    form = (
      <div>
        <div id="backdrop" onClick={closeEvent}></div>
        <EventSubmitForm
          submit={submitForm}
          country={props.country}
          city={props.city}
          technology={props.technology}
        />
      </div>
    );
  }

  return <div>{form}</div>;
};

export default eventSubmit;
