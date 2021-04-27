import React from "react";
import { useHistory } from "react-router";
import { Stack } from "@fluentui/react/lib";

import { useStore } from "../../hooks/hooks";
import { ActionTypes } from "../../context/actionTypes";
import HeaderNav from "./Navigation";
import ButtonLog from "./ButtonLog";

const logo = require("./../../assets/img/logo.svg");

const Header: React.FC = () => {
  const { state, dispatch } = useStore();
  const logOut = () => {
    dispatch({ type: ActionTypes.SIGN_OUT });
  };
  const history = useHistory();

  return (
    <header style={{ padding: "2em" }}>
      <Stack horizontal horizontalAlign="space-between">
        <div style={{ display: "flex", alignItems: "center", width: "550px" }}>
          <img
            src={logo.default}
            height="24"
            width="150"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/events")}
            alt="exadel"
          />
          {state.isAuthenticated && <HeaderNav />}
        </div>
        <ButtonLog
          isLoggedIn={state.isAuthenticated}
          userName={"Admin"}
          logout={logOut}
        />{" "}
        {/*dinamic userName */}
      </Stack>
    </header>
  );
};

export default Header;
