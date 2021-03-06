import React, { useContext } from "react";
import MyResponsiveBar from "../components/barGraph/MyResponsiveBar";
import MyResponsiveCalendar from "../components/calendar/MyResponsiveCalendar";
import MyResponsivePie from "../components/cardPies/MyResponsivePie";
import _ from "lodash";
import dayjs from "dayjs";
import "./VizPage.css";

import { GlobalContext } from "../context/GlobalState";
import MyResponsiveTimeBar from "../components/barGraph/MyResponsiveTimeBar";

const VizPage = () => {
	// global context -------------
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
		selectedTimeBarGraphData,
		setSelectedTimeBarGraphData,
		selectedScheduleData,
		setSelectedScheduleData,
		showPieNDateBar,
		setShowPieNDateBar,
		showTimeBar,
		setShowTimeBar,
	} = GContext;
	// global context -------------

	// setDateNPie ------------- sets required values
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
		//set selected calander date only
		setSelectedDateData(newSelectedDateData);
		//set selected date data
		setSelectedDayPieChart(newSelectedDayPieChart);
		//set pie chart data
		setSelectedDateBarGraphData(newSelectedDateBarGraphData);
		//set date bar  graph data

		setShowPieNDateBar(true);
		setShowTimeBar(false);
	};

	// setDateNPie ------------- sets required values----------------

	// console.log(_.groupBy(assignmentData, "item_date"));

	// console.log(selectedDayPieChart);
	// console.log(selectedDayPieChart.map((item) => ({ ...item, value: 5 })));

	let timeNamingArray = [
		{ timeRange: ["00", "01", "02"], timeRangeName: "12am-03am" },
		{ timeRange: ["03", "04", "05"], timeRangeName: "03am-06am" },
		{ timeRange: ["06", "07", "08"], timeRangeName: "06am-09am" },
		{ timeRange: ["09", "10", "11"], timeRangeName: "09am-12pm" },
		{ timeRange: ["12", "13", "14"], timeRangeName: "12pm-03pm" },
		{ timeRange: ["15", "16", "17"], timeRangeName: "03pm-06pm" },
		{ timeRange: ["18", "19", "20"], timeRangeName: "06pm-09pm" },
		{ timeRange: ["21", "22", "23"], timeRangeName: "09pm-12am" },
	];

	const setTimeBarData = (data) => {
		const timeDataArray = data.data.array;

		console.log(timeDataArray);

		const newSelectedScheduleData = data.data.date;
		console.log(newSelectedScheduleData);

		const newSelectedDateBasedTimeData = timeDataArray.map((item) => {
			const timeNameObjects = timeNamingArray.map((time) => {
				if (time.timeRange.includes(item.hour) === true) {
					return { ...item, rangeName: time.timeRangeName };
				} else {
					return;
				}
			});
			// return timeNameObjects.filter((oof) => oof !== undefined);
			return _.compact(timeNameObjects);
		});

		const flattenedData = _.flatten(newSelectedDateBasedTimeData);

		const formattedTimeDataArray = _.chain(flattenedData)
			.groupBy("rangeName")

			.map((value, key) => ({
				time: key,
				value: _.countBy(value, "newSlot"),
				DinnerColor: "hsl(40, 70%, 50%)",
				LunchColor: "hsl(26, 70%, 50%)",
				array: value,
			}))

			.value();
		console.log(formattedTimeDataArray);
		console.log(
			_.merge(
				formattedTimeDataArray.map((item) => item),
				formattedTimeDataArray.map((item) => item.value)
			)
		);

		const newSelectedTimeBarGraphData = _.merge(
			formattedTimeDataArray.map((item) => item),
			formattedTimeDataArray.map((item) => item.value)
		);

		setSelectedTimeBarGraphData(newSelectedTimeBarGraphData);
		setShowTimeBar(true);
	};

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

			{!showPieNDateBar ? (
				<div className="din-vs-lun-main">
					<div className="din-vs-lun--card--info">
						<p>Select a valid date to visualize!</p>
					</div>
				</div>
			) : (
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
			)}

			{/* <div className="cards">
				<div className="pie-container">
					<MyResponsivePie />
				</div> */}

			{!showPieNDateBar ? (
				<div className="din-vs-lun-main">
					<div className="din-vs-lun--card--info">
						<p>Select a valid date to visualize!</p>
					</div>
				</div>
			) : (
				<div className="schedule-graph-main">
					<div className="bar-graph-container">
						<MyResponsiveBar
							data={selectedDateBarGraphData}
							setTimeBarData={setTimeBarData}
						/>
					</div>
				</div>
			)}

			{!showTimeBar ? (
				<div className="din-vs-lun-main">
					<div className="din-vs-lun--card--info">
						<p>Select a bar graph to visualize!</p>
					</div>
				</div>
			) : (
				<div className="schedule-graph-main time-frame">
					<div className="bar-graph-container">
						<MyResponsiveTimeBar data={selectedTimeBarGraphData} />
					</div>
				</div>
			)}
		</div>
	);
};

export default VizPage;
