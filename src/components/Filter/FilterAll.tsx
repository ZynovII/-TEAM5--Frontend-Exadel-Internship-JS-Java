import React from "react";
import { IFilterItem, DropdownControlledExample } from "./FilterItem";
import { PrimaryButton } from "@fluentui/react";

const filters = [
	{
		id: 1,
		placeholder: "All",
		label: "Event type",
		options: [
			{ key: "Meet-up", text: "Meet-up" },
			{ key: "Training", text: "Training" },
			{ key: "Internship", text: "Internship" },
		],
	},
	{
		id: 2,
		placeholder: "All",
		label: "Speciality",
		options: [
			{ key: "HR", text: "HR" },
			{ key: "DevOps", text: "DevOps" },
		],
	},
	{
		id: 3,
		placeholder: "All",
		label: "Locations",
		options: [
			{ key: "USA", text: "USA" },
			{ key: "Belarus", text: "Belarus" },
			{ key: "Russia", text: "Russia" },
			{ key: "Ukraine", text: "Ukraine" },
		],
	},
];

const filterDisplay = {
	display: "flex",
	width: "73%",
	margin: "2em auto",
	justifyContent: "space-between",
} as const;

export const AllFilters: React.FC = () => {
	return (
		<>
			<section style={filterDisplay}>
				{filters.map((obj: IFilterItem) => (
					<div key={obj.id}>
						<DropdownControlledExample filterItem={obj} />
					</div>
				))}
			</section>
			<div className="margin2em button_center">
				<PrimaryButton text="Search" className="button" />
			</div>
		</>
	);
};

export default AllFilters;
