import React, { useContext, useEffect } from "react";
import App from "./App";
import { GlobalContext } from "./context/GlobalState";

import _ from "lodash";

import assignmentDataJson from "./assignmentData.json";

// import assignmentData from "./assignmentData.json";

// console.log(
// 	_.chain(assignmentData)
// 		// Group the elements of Array based on `color` property
// 		.groupBy("item_date")
// 		// `key` is group's name (color), `value` is the array of objects
// 		.map((value, key) => ({ color: key, users: value }))
// 		.value()
// );

const HomePage = () => {
	const GContext = useContext(GlobalContext);

	const { assignmentData, setAssignmentData, calanderData, setCalanderData } =
		GContext;

	useEffect(() => {
		setAssignmentData(assignmentDataJson);
		setCalanderData(_.countBy(assignmentDataJson, "item_date"));
	}, []);

	console.log(assignmentDataJson);

	console.log(_.groupBy(assignmentDataJson, "item_date"));

	const dataArray = _.chain(assignmentDataJson)
		.groupBy("item_date")
		.map((value, key) => [{ day: key }, { value: value }])
		.value();

	console.log(assignmentDataJson);
	console.log(dataArray);

	console.log(_.countBy(assignmentDataJson, "item_date"));

	return (
		<>
			<App />
		</>
	);
};

export default HomePage;
