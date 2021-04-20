import * as React from "react";
import "./styles/EventSubmit.scss";

import EventSubmitForm from "./EventSubmitForm/EventSubmitForm";

const eventSubmit = (props) => {
  
  let form;
  if (props.open) {
    form = (
      <div>
        <div id="backdrop" onClick={props.close}></div>
        <EventSubmitForm
          submit={props.submit}
          country={props.country}
          city={props.city}
          technology={props.technology}
        />
      </div>
    );
  }

  return form;
};

export default eventSubmit;
