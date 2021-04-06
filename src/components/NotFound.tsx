import { mergeStyles } from "@fluentui/merge-styles";
import { getTheme } from "@fluentui/react";
import React from "react";

const titleStyle = {
  fontSize: "68px",
  paddingLeft: "2rem",
  color: getTheme().palette.themePrimary,
};
const spanClass = mergeStyles({
  padding: "1rem",
  fontSize: "20px",
  color: getTheme().palette.themeTertiary,
});
const className = mergeStyles(spanClass, {
  padding: "2rem",
});

export const NotFound = () => (
  <div className={className}>
    <div className="ms-Grid-col">
      <span style={titleStyle}>404</span>
      <br />
      <span className={spanClass}>Page not found...</span>
    </div>
  </div>
);
