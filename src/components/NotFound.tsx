import { mergeStyles } from "@fluentui/merge-styles";
import { getTheme } from "@fluentui/react";
import React from "react";

const titleStyle = {
  fontSize: "68px",
  color: getTheme().palette.themePrimary,
};
const spanClassTitle = mergeStyles({
  padding: "1rem 1rem 0.5rem 1rem",
  fontSize: "25px",
  // color: getTheme().palette.themeTertiary,
});
const spanClass = mergeStyles({
  fontSize: "20px",
});
const className = mergeStyles(spanClass, {
  padding: "2rem",
  textAlign: 'center',
});

export const NotFound = () => (
  <div className={className}>
    <p style={titleStyle}>404</p>
    <p className={spanClassTitle}>We are sorry, the page you requested cannot be found.</p>
    <p className={spanClass}>The URL may be misspelled or the page you're looking for is no longer available.</p>
  </div>
);
