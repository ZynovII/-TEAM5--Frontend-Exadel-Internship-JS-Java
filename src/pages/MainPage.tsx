import React from "react";
import { Nav, INavStyles, INavLinkGroup } from "@fluentui/react/lib/Nav";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { NotFound } from "../components/NotFound";
import { Route, Switch, useHistory } from "react-router";

const navStyles: Partial<INavStyles> = {
	root: {
		width: 208,
		height: 350,
		boxSizing: "border-box",
		border: "1px solid #eee",
		overflowY: "auto",
	},
};

const navLinkGroups: INavLinkGroup[] = [
	{
		links: [
			{
				name: "Home",
				url: "http://example.com",
				expandAriaLabel: "Expand Home section",
				collapseAriaLabel: "Collapse Home section",
				links: [
					{
						name: "Activity",
						url: "http://msn.com",
						key: "key1",
						target: "_blank",
					},
					{
						name: "MSN",
						url: "http://msn.com",
						disabled: true,
						key: "key2",
						target: "_blank",
					},
				],
				isExpanded: true,
			},
			{
				name: "Documents",
				url: "http://example.com",
				key: "key3",
				isExpanded: true,
				target: "_blank",
			},
			{
				name: "Pages",
				url: "/admin",
				key: "key4",
			},
			{
				name: "Notebook",
				url: "http://msn.com",
				key: "key5",
				disabled: true,
			},
			{
				name: "Communication and Media",
				url: "http://msn.com",
				key: "key6",
				target: "_blank",
			},
			{
				name: "News",
				url: "/events/cnn",
				icon: "News",
				key: "key7",
				target: "_blank",
			},
		],
	},
];

export const MainPage = () => {
	const history = useHistory();
	return (
		<React.Fragment>
			<Header />
			<main className="main">
				<Switch>
					<Route path="/events" exact>
						<Nav
							selectedKey="key3"
							ariaLabel="Nav basic example"
							styles={navStyles}
							groups={navLinkGroups}
							onLinkClick={(eo, elem) => {
								eo.preventDefault();
								history.push(elem.url);
							}}
						/>
						<main>
							<h1>Hello World!</h1>
							<p>Foo to the barz</p>
						</main>
					</Route>
					<Route component={NotFound} />
				</Switch>
			</main>
			<Footer />
		</React.Fragment>
	);
};
