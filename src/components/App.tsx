import { hot } from "react-hot-loader/root";
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "office-ui-fabric-core/dist/css/fabric.css";

import "./../assets/scss/App.scss";
import { MainPage } from "../pages/MainPage";
import { AdminPage } from "../pages/AdminPage";
import { Store } from "../context/Store";
import EventSubmit from '../components/EventSubmit/EventSubmit'
import dummyData from '../components/EventSubmit/_dummyData';

const App = () => {
  return (
    <Store>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/EventSubmit">
            <EventSubmit 
            country={dummyData.country} 
            city={dummyData.city} 
            technology={dummyData.technology} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Store>
  );
};

export default hot(App);
