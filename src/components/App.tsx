import { hot } from "react-hot-loader/root";
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'office-ui-fabric-core/dist/css/fabric.css';

import "./../assets/scss/App.scss";
import { MainPage } from "../pages/MainPage";
import { Store } from "../context/Store";
import EventPage from '../components/EventPage/EventPage';
import dummyData from '../components/EventPage/_dummyData';

const App = () => {
  return (
    <Store>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path='/events'>
            <EventPage
              title={dummyData.title}
              date={dummyData.date}
              descrition={dummyData.description}
              photoURL={dummyData.photoURL}
              technology = {dummyData.technology}
              location = {dummyData.location}
               />
          </Route>
        </Switch>
      </BrowserRouter>
    </Store>
  );
}

export default hot(App);
