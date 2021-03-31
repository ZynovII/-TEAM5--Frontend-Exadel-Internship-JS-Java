import { hot } from "react-hot-loader/root";
import * as React from "react";
import 'office-ui-fabric-core/dist/css/fabric.css';


import "./../assets/scss/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import EventPage from '../pages/EventPage'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route>
          <EventPage title='Internship JS & Java' date='01.03.2021 - 15.04.2021, Belarus'></EventPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default hot(App);
