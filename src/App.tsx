import { hot } from "react-hot-loader/root";
import * as React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  HashRouter,
} from "react-router-dom";
import "office-ui-fabric-core/dist/css/fabric.css";

import "./assets/scss/App.scss";
import { MainPage } from "./pages/MainPage";
import { AdminPage } from "./pages/AdminPage";
import { Store } from "./context/Store";
import { NotFoundPage } from "./pages/NotFoundPage";
import Scrollbar from "./components/UI/Scrollbar/Scrollbar";
import TSPage from "./components/TSPage/TSPage";
const App = () => (
  <Store>
    <HashRouter>
      <Scrollbar>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/events" />
          </Route>
          <Route path="/events" component={MainPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/techinterview:id" component={TSPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Scrollbar>
    </HashRouter>
  </Store>
);

export default hot(App);
