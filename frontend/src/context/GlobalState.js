import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
	const [assignmentData, setAssignmentData] = useState([]);
	const [calanderData, setCalanderData] = useState([]);
	const [selectedCalanderDate, setSelectedCalanderDate] = useState({
		day: "",
		value: 0,
	});
	const [selectedDayPieChart, setSelectedDayPieChart] = useState([
		{
			id: "Dinner",
			label: "Dinner",
			value: 50,
			color: "hsl(286, 70%, 50%)",
		},
		{
			id: "Lunch",
			label: "Lunch",
			value: 50,
			color: "hsl(55, 70%, 50%)",
		},
	]);

	const [selectedDateData, setSelectedDateData] = useState([]);

	return (
		<GlobalContext.Provider
			value={{
				assignmentData,
				setAssignmentData,
				calanderData,
				setCalanderData,
				selectedCalanderDate,
				setSelectedCalanderDate,
				selectedDayPieChart,
				setSelectedDayPieChart,
				selectedDateData,
				setSelectedDateData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
