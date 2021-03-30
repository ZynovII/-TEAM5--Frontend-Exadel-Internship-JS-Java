import { hot } from "react-hot-loader/root";
import * as React from "react";

import "./../assets/scss/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainPage } from "../pages/MainPage";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={MainPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default hot(App);
