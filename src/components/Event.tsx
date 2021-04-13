import React from "react";

import { DescriptionEventPage } from "./DescrioptionEventPage/DescriptionEvenPage";
import { Registration } from "./Registration/Registration";

const Event: React.FC = (props) => {
	return (
		<main className="main">
			<h1 style={{ textAlign: "center", marginBottom:"1em" }}>Internship JS & Java</h1>
			<DescriptionEventPage />
			<Registration name="Js && Java"/>
		</main>
	);
};

export default Event;
