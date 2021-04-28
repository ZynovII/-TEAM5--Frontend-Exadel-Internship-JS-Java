import { mergeStyles } from "@fluentui/merge-styles";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const UserCircle: React.FC = () => {
  const { currentUserId } = useAuth();
  return <div className={userCircle}>{currentUserId}UZ</div>;
};

const userCircle = mergeStyles({
  borderRadius: "50%",
  height: 30,
  width: 30,
  backgroundColor: "rgba(40,40,255,.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: ".8em",
  fontWeight: 600,
  margin: 5,
  position: "absolute",
  zIndex: 5,
  right: 5,
  top: 5,
});

export default UserCircle;
