import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
	const [assignmentData, setAssignmentData] = useState([]);
	const [calanderData, setCalanderData] = useState([]);
	const [showPieNDateBar, setShowPieNDateBar] = useState(false);
	const [showTimeBar, setShowTimeBar] = useState(false);
	const [selectedCalanderDate, setSelectedCalanderDate] = useState({
		day: "",
		value: 0,
	});
	const [selectedScheduleData, setSelectedScheduleData] = useState("");

	const [selectedDateBarGraphData, setSelectedDateBarGraphData] = useState([
		{
			date: "20 Jan",

			Dinner: 23,
			DinnerColor: "hsl(40, 70%, 50%)",
			Lunch: 173,
			LunchColor: "hsl(26, 70%, 50%)",
		},
		{
			date: "2016-09-06",

			Dinner: 197,
			DinnerColor: "hsl(349, 70%, 50%)",
			Lunch: 0,
			LunchColor: "hsl(98, 70%, 50%)",
		},
	]);

	const [selectedTimeBarGraphData, setSelectedTimeBarGraphData] = useState([
		{
			time: "09-12",

			Dinner: 23,
			DinnerColor: "hsl(40, 70%, 50%)",
			Lunch: 173,
			LunchColor: "hsl(26, 70%, 50%)",
		},
		{
			time: "15-18",

			Dinner: 197,
			DinnerColor: "hsl(349, 70%, 50%)",
			Lunch: 0,
			LunchColor: "hsl(98, 70%, 50%)",
		},
	]);

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
				selectedDateBarGraphData,
				setSelectedDateBarGraphData,
				selectedTimeBarGraphData,
				setSelectedTimeBarGraphData,
				selectedScheduleData,
				setSelectedScheduleData,
				showPieNDateBar,
				setShowPieNDateBar,
				showTimeBar,
				setShowTimeBar,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
