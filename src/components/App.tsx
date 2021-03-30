import { hot } from "react-hot-loader/root";
import * as React from "react";

import "./../assets/scss/App.scss";

import { Store } from "../context/Store";

const App = () => {
    return <Store></Store>;
};

export default hot(App);
