import { hot } from "react-hot-loader/root";
import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'office-ui-fabric-core/dist/css/fabric.css'; 

import "./../assets/scss/App.scss";
import { MainPage } from "../pages/MainPage";
import { AdminPage } from "../pages/AdminPage";
import { Store } from "../context/Store";

const App = () => {
    return (
      <Store>
        <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/events" />
              </Route>
              <Route path="/events" component={MainPage} />
              <Route path="/admin" component={AdminPage} />
            </Switch>
        </BrowserRouter>
      </Store>
    );
};

export default hot(App);
