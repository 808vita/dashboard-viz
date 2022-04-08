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
			return {
				...item,
				date: dayjs(item.schedule_time).format("DD MMM"),
			};
		});

		console.log(newFormattedDayData);
		console.log(_.groupBy(newFormattedDayData, "date"));

		const formattedDayDataArray = _.chain(newFormattedDayData)
			.groupBy("date")
			.map((value, key) => ({ date: key, value: value }))
			.value();
		console.log(formattedDayDataArray);

		// formatted date data----------------

		setSelectedDayPieChart(newSelectedDayPieChart);
		setSelectedCalanderDate(date);
		setSelectedDateData(newSelectedDateData);
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
					<MyResponsiveBar />
				</div>
			</div>

			<div className="schedule-graph-main time-frame">
				<div className="bar-graph-container">
					<MyResponsiveBar />
				</div>
			</div>
		</div>
	);
};

export default VizPage;
