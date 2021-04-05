import { FC } from "react";

import { Stack } from "@fluentui/react/lib";

import HeaderNav from "./Header_nav";
import ButtonLog from "./Button_log";

import "./Header.scss";

const logo = require("./../../assets/img/logo.svg");

const Header: FC = () => {
  return (
    <Stack horizontal horizontalAlign="space-between" className="header">
      <div style={{display:"flex", alignItems: 'center'}}>
        <img src={logo.default} height="24" width="150" alt="exadel" />
        <HeaderNav />
      </div>
      <ButtonLog />
    </Stack>
  );
};

export default Header;
