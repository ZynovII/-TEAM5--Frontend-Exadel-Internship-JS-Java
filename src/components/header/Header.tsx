import { FC } from "react";

import { Stack } from "@fluentui/react/lib";

import HeaderNav from "./Header_nav";
import ButtonLog from "./Button_log";

import "./Header.scss";

const logo = require("./../../assets/img/logo.svg");

const Header: FC = () => {
	return (
		<header className="header">
			<Stack horizontal horizontalAlign="space-between">
				<div style={{display:"flex", alignItems:'center', width:"550px"}}>
          <img src={logo.default} height="24" width="150" alt="exadel" />
          <HeaderNav />
        </div>
				<ButtonLog />
			</Stack>
		</header>
	);
};

export default Header;

