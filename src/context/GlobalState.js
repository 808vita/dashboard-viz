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

	const [showVizPage, setShowVizPage] = useState(true);

	// bonus page realted states ---------------
	const [showBonusPage, setShowBonusPage] = useState(false);

	const [selectedDateOne, setSelectedDateOne] = useState({
		selected: false,
		dateOne: "",
	});
	const [selectedDateTwo, setSelectedDateTwo] = useState({
		selected: false,
		dateTwo: "",
	});

	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");

	const [selectedRangePieChart, setSelectedRangePieChart] = useState([]);
	const [selectedRangeTotalOrders, setSelectedRangeTotalOrders] = useState(0);
	const [selectedRangeDateCount, setSelectedRangeDateCount] = useState(0);
	const [showBonusPieNBar, setShowBonusPieNBar] = useState(false);
	const [selectedRangeBarGraphData, setSelectedRangeBarGraphData] = useState(
		[]
	);

	// bonus page realted states ---------------//////////////////
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
				showVizPage,

				setShowVizPage,

				// bonus page items
				showBonusPage,
				setShowBonusPage,
				selectedDateOne,
				setSelectedDateOne,
				selectedDateTwo,
				setSelectedDateTwo,
				fromDate,
				setFromDate,
				toDate,
				setToDate,
				selectedRangePieChart,
				setSelectedRangePieChart,
				showBonusPieNBar,
				setShowBonusPieNBar,
				selectedRangeTotalOrders,
				setSelectedRangeTotalOrders,
				selectedRangeDateCount,
				setSelectedRangeDateCount,
				selectedRangeBarGraphData,
				setSelectedRangeBarGraphData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
