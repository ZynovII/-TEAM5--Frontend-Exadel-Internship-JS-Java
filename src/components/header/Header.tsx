import { FC, useState } from "react";

import { Stack } from "@fluentui/react/lib";

import HeaderNav from "./Header_nav";
import ButtonLog from "./Button_log";

import classes from "./Header.module.scss";

const logo = require("./../../assets/img/logo.svg");

const Header: FC = () => {
	const [status, setStatus] = useState({
		isLoggedIn: true
	})
	const logOut = () => {
		setStatus({ isLoggedIn: false })
	}
	return (
		<header className={classes.Header}>
			<div className='wrapper bigger'>
				<Stack horizontal horizontalAlign="space-between">
					<div style={{ display: "flex", alignItems: 'center', width: "550px" }}>
						<a href = '/'>
							<img src={logo.default} height="24" width="150" alt="exadel" />
						</a>
						<HeaderNav />
					</div>
					<ButtonLog isLoggedIn={status.isLoggedIn} userName={'Admin'} logout={logOut} />
				</Stack>
			</div>
		</header>
	);
};

export default Header;

