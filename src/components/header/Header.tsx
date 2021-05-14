import React from "react";
import { useHistory } from "react-router";
import { Stack } from "@fluentui/react/lib";

import HeaderNav from "./Navigation";
import ButtonLog from "./ButtonLog";
import { useAuth } from "../../hooks/useAuth";

const logo = require("./../../assets/img/logo.svg");

const Header: React.FC = () => {
  const { isAuth, currentUser } = useAuth();
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
          {isAuth && <HeaderNav />}
        </div>
        <ButtonLog
          isLoggedIn={isAuth}
          userName={isAuth && currentUser.fullName.split(" ")[0]}
        />{" "}
        {/*dinamic userName */}
      </Stack>
    </header>
  );
};

export default Header;
