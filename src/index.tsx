import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { initializeIcons } from "@fluentui/react/lib/Icons";
const rootEl = document.getElementById("root");
initializeIcons();
render(<App />, rootEl);
