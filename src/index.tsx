import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { loadTheme, createTheme } from "@fluentui/react";
loadTheme(
  createTheme({
    defaultFontStyle: {
      fontFamily: "Roboto",
    },
  })
);
const rootEl = document.getElementById("root");
initializeIcons();
render(<App />, rootEl);
