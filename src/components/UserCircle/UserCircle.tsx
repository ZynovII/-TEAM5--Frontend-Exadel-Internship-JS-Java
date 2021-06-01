import { mergeStyles } from "@fluentui/merge-styles";
import React from "react";

const UserCircle = ({ initials }) => (
  <div className={userCircle}>{initials}</div>
);

const userCircle = mergeStyles({
  borderRadius: "50%",
  height: 40,
  width: 40,
  backgroundColor: "rgba(40,40,255,.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1em",
  fontWeight: 600,
});

export default UserCircle;
