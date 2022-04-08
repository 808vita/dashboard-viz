import React, { useContext } from "react";
import MyResponsiveBar from "../components/barGraph/MyResponsiveBar";
import MyResponsiveCalendar from "../components/calendar/MyResponsiveCalendar";
import MyResponsivePie from "../components/cardPies/MyResponsivePie";
import _ from "lodash";
import dayjs from "dayjs";
import "./VizPage.css";

import { GlobalContext } from "../context/GlobalState";

const VizPage = () => {
	const GContext = useContext(GlobalContext);
	const {
		assignmentData,
		calanderData,
		selectedCalanderDate,
		setSelectedCalanderDate,
		selectedDayPieChart,
		setSelectedDayPieChart,
		selectedDateData,
		setSelectedDateData,
		selectedDateBarGraphData,
		setSelectedDateBarGraphData,
	} = GContext;

	const setDateNPie = (date) => {
		const currentDate = date.day;

		const groupedByDate = _.groupBy(assignmentData, "item_date");

		const newSelectedDateData = groupedByDate[currentDate];
		console.log(newSelectedDateData);
		//need newSelectedDateData as global state next bar chart

		console.log(
			newSelectedDateData.map((item) =>
				dayjs(item.schedule_time).format("DD MMM")
			)
		);

		const countedBySlot = _.countBy(newSelectedDateData, "slot");
		// console.log(countedBySlot);

		// creating new pie data
		const newSelectedDayPieChart = selectedDayPieChart.map((item) => {
			if (item.id === "Dinner") {
				return { ...item, value: countedBySlot.D };
			} else {
				return { ...item, value: countedBySlot.L };
			}
		});

		// console.log(newSelectedDayPieChart);
		// setting new pie data ----------------

		// creating new formatted date data
		const newFormattedDayData = newSelectedDateData.map((item) => {
			if (item.slot === "D") {
				return {
					...item,
					date: dayjs(item.schedule_time).format("DD MMM"),
					hour: dayjs(item.schedule_time).format("HH"),
					newSlot: "Dinner",
				};
			} else {
				return {
					...item,
					date: dayjs(item.schedule_time).format("DD MMM"),
					hour: dayjs(item.schedule_time).format("HH"),
					newSlot: "Lunch",
				};
			}
		});

		console.log(newFormattedDayData);
		console.log(_.groupBy(newFormattedDayData, "date"));

		const countedByNewSlot = _.countBy(newFormattedDayData, "newSlot");
		console.log(countedByNewSlot);

		const formattedDayDataArray = _.chain(newFormattedDayData)
			.groupBy("date")

			// .map((value, key) => ({
			// 	date: key,
			// 	value: _.countBy(value, "newSlot"),
			// }))

			.map((value, key) => ({
				date: key,
				value: _.countBy(value, "newSlot"),
				DinnerColor: "hsl(40, 70%, 50%)",
				LunchColor: "hsl(26, 70%, 50%)",
				array: value,
			}))

			.value();
		console.log(formattedDayDataArray);
		console.log(
			_.merge(
				formattedDayDataArray.map((item) => item),
				formattedDayDataArray.map((item) => item.value)
			)
		);

		const newSelectedDateBarGraphData = _.merge(
			formattedDayDataArray.map((item) => item),
			formattedDayDataArray.map((item) => item.value)
		);

		console.log(selectedDateBarGraphData);

		// formatted date data----------------
		setSelectedCalanderDate(date);
		setSelectedDateData(newSelectedDateData);
		setSelectedDayPieChart(newSelectedDayPieChart);
		setSelectedDateBarGraphData(newSelectedDateBarGraphData);
	};

	// console.log(_.groupBy(assignmentData, "item_date"));

	// console.log(selectedDayPieChart);
	// console.log(selectedDayPieChart.map((item) => ({ ...item, value: 5 })));

	return (
		<div className="viz-container">
			<header>
				<h1>Viz Page</h1>
			</header>
			<div className="calendar-box">
				<div className="calendar-container">
					<MyResponsiveCalendar data={calanderData} setDateNPie={setDateNPie} />
				</div>
			</div>

			<div className="din-vs-lun-main">
				<div className="din-vs-lun--card">
					<div className="din-vs-lun--card--info">
						<span>Selected Date :</span>
						<p>{dayjs(selectedCalanderDate.day).format("MMM D, YYYY")}</p>
					</div>
					<div className="din-vs-lun--card--info">
						<span>Total Orders :</span>
						<p> {selectedCalanderDate.value}</p>
					</div>
				</div>

				<div className="pie-box">
					<div className="pie-container">
						<MyResponsivePie data={selectedDayPieChart} />
					</div>
				</div>
			</div>

			{/* <div className="cards">
				<div className="pie-container">
					<MyResponsivePie />
				</div> */}

			<div className="schedule-graph-main">
				<div className="bar-graph-container">
					<MyResponsiveBar data={selectedDateBarGraphData} />
				</div>
			</div>

			<div className="schedule-graph-main time-frame">
				<div className="bar-graph-container">
					<MyResponsiveBar data={selectedDateBarGraphData} />
				</div>
			</div>
		</div>
	);
};

export default VizPage;
