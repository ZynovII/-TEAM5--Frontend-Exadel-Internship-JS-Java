import { hot } from "react-hot-loader/root";
import * as React from "react";
import "office-ui-fabric-core/dist/css/fabric.css";

import "./assets/scss/App.scss";
import { Store } from "./context/Store";
import Layout from "./hoc/Layout";

const App = () => (
  <Store>
    <Layout />
  </Store>
);

export default hot(App);
