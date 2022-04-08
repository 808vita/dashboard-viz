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

	// console.log(assignmentDataJson);

	// console.log(_.countBy(assignmentDataJson, "item_date"));

	// calendar array

	const calanderDataArray = _.chain(assignmentDataJson)
		.countBy("item_date")
		.map((value, key) => ({ day: key, value: value }))
		.value();

	// console.log(calanderDataArray);

	// calendar array ------------------

	useEffect(() => {
		setAssignmentData(assignmentDataJson);
		setCalanderData(calanderDataArray);
	}, []);

	return (
		<>
			<App />
		</>
	);
};

export default HomePage;
