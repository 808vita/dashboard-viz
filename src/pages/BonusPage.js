import React, { useContext } from "react";

import MyResponsivePie from "../components/cardPies/MyResponsivePie";
import _ from "lodash";
import dayjs from "dayjs";

import Moment from "moment";
import { extendMoment } from "moment-range";

import "./BonusPage.css";

import { GlobalContext } from "../context/GlobalState";

import BonusMyResponsiveBar from "../components/barGraph/MyResponsiveBar";
import BonusMyResponsiveTimeBar from "../components/barGraph/bonusPage/BonusMyResponsiveTimeBar";
import BonusMyResponsiveCalendar from "../components/calendar/bonusPage/BonusMyResponsiveCalendar";

const moment = extendMoment(Moment);

const BonusPage = () => {
	// global context -------------
	const GContext = useContext(GlobalContext);
	const {
		assignmentData,
		calanderData,
		selectedCalanderDate,
		setSelectedCalanderDate,
		selectedDayPieChart,
		setSelectedDayPieChart,

		setSelectedDateData,
		selectedDateBarGraphData,
		setSelectedDateBarGraphData,
		selectedTimeBarGraphData,
		setSelectedTimeBarGraphData,

		showPieNDateBar,
		setShowPieNDateBar,
		showTimeBar,
		setShowTimeBar,
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
	} = GContext;
	// global context -------------

	/// setTwoDates preps dates for creating date range between two selected dates

	const setTwoDates = (date) => {
		if (!selectedDateOne.selected) {
			setSelectedDateOne({
				selected: true,
				dateOne: date.day,
			});
		}
		if (selectedDateOne) {
			setSelectedDateTwo({
				selected: true,
				dateTwo: date.day,
			});
		}

		// console.log(selectedDateOne);
		// console.log(selectedDateTwo);
		// console.log(
		// 	dayjs(selectedDateTwo.dateTwo).isBefore(
		// 		dayjs(selectedDateOne.dateOne, "date")
		// 	)
		// );

		setShowBonusPieNBar(false);
	};

	const submitHandler = () => {
		const newFromDate = !dayjs(selectedDateTwo.dateTwo).isBefore(
			dayjs(selectedDateOne.dateOne, "date")
		)
			? dayjs(selectedDateOne.dateOne).format("YYYY-MM-DD")
			: dayjs(selectedDateTwo.dateTwo).format("YYYY-MM-DD");

		console.log(newFromDate);

		const newToDate = dayjs(selectedDateTwo.dateTwo).isBefore(
			dayjs(selectedDateOne.dateOne, "date")
		)
			? dayjs(selectedDateOne.dateOne).format("YYYY-MM-DD")
			: dayjs(selectedDateTwo.dateTwo).format("YYYY-MM-DD");
		console.log(newToDate);

		const start = newFromDate;
		const end = newToDate;

		let FromToDateArray = [];
		let currentDate = dayjs(start);
		let stopDate = dayjs(end);
		while (currentDate <= stopDate) {
			FromToDateArray.push(dayjs(currentDate).format("YYYY-MM-DD"));
			currentDate = dayjs(currentDate).add(1, "days");
		}
		console.log(FromToDateArray);
		console.log(FromToDateArray.length);

		const totalSelectedDates = FromToDateArray.length;

		setSelectedRangeDateCount(totalSelectedDates);

		// const groupedByDate = _.groupBy(assignmentData, "item_date");
		// console.log(groupedByDate);

		const processedBonusPageStarterData = assignmentData.map((item) => {
			if (item.slot === "D")
				return {
					...item,
					scheduleDate: dayjs(item.schedule_time).format("DD MMM"),
					schedule_hour: dayjs(item.schedule_time).format("HH"),
					schedule_placed: dayjs(item.schedule_time).diff(
						item.item_date,
						"day"
					),
					newSlot: "Dinner",
				};
			else {
				return {
					...item,
					scheduleDate: dayjs(item.schedule_time).format("DD MMM"),
					schedule_hour: dayjs(item.schedule_time).format("HH"),
					schedule_placed: dayjs(item.schedule_time).diff(
						item.item_date,
						"day"
					),
					newSlot: "Lunch",
				};
			}
		});

		console.log(processedBonusPageStarterData);

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

		const starterDataWithRangeNameRaw = processedBonusPageStarterData.map(
			(item) => {
				const timeNameObjects = timeNamingArray.map((time) => {
					if (time.timeRange.includes(item.schedule_hour) === true) {
						return { ...item, rangeName: time.timeRangeName };
					} else {
						return;
					}
				});
				// return timeNameObjects.filter((oof) => oof !== undefined);
				return _.compact(timeNameObjects);
			}
		);

		const starterDataWithRangeNameProcessed = starterDataWithRangeNameRaw.map(
			(item) => item[0]
		);

		console.log(starterDataWithRangeNameProcessed);

		console.log(
			starterDataWithRangeNameProcessed.map((item) => {
				if (item.schedule_placed === 0) {
					return { ...item, orderPlaced: "Same Day" };
				}
				if (item.schedule_placed === -1) {
					return {
						...item,
						orderPlaced: Math.abs(item.schedule_placed) + " day prior",
					};
				}

				if (item.schedule_placed < -1) {
					return {
						...item,
						orderPlaced: Math.abs(item.schedule_placed) + " days prior",
					};
				} else {
					return console.log({ postiveNumber: item });
				}
			})
		);

		const groupedBySelectedDateRange = _.chain(processedBonusPageStarterData)
			.groupBy("item_date")

			.map((value, key) => ({
				date: key,
				value: _.countBy(value, "slot"),
				selectedDate: _.compact(
					FromToDateArray.map((item) => {
						if (item === key) return item === key;
					})
				),
				array: value,
			}))
			.groupBy("selectedDate")

			.value();

		console.log(groupedBySelectedDateRange);

		const SelectedDateRangeDinnerLucnchArray =
			(_.merge(groupedBySelectedDateRange.true),
			groupedBySelectedDateRange.true.map((item) => item.value));

		console.log(SelectedDateRangeDinnerLucnchArray);

		const totalOrdersInSelectedRange = _.sumBy(
			["D", "L"],
			_.partial(_.sumBy, SelectedDateRangeDinnerLucnchArray)
		);
		console.log(totalOrdersInSelectedRange);

		const totalDinnerInSelectedRange = _.sumBy(
			["D"],
			_.partial(_.sumBy, SelectedDateRangeDinnerLucnchArray)
		);
		console.log(totalDinnerInSelectedRange);

		const totalLunchInSelectedRange = _.sumBy(
			["L"],
			_.partial(_.sumBy, SelectedDateRangeDinnerLucnchArray)
		);
		console.log(totalLunchInSelectedRange);

		const totalDinnerLunchSelectedRange = [
			{
				id: "Dinner",
				label: "Dinner",
				value: totalDinnerInSelectedRange,
				color: "hsl(286, 70%, 50%)",
			},
			{
				id: "Lunch",
				label: "Lunch",
				value: totalLunchInSelectedRange,
				color: "hsl(55, 70%, 50%)",
			},
		];
		setSelectedRangeTotalOrders(totalOrdersInSelectedRange);
		setSelectedRangePieChart(totalDinnerLunchSelectedRange);
		setShowBonusPieNBar(true);
	};

	const resetHandler = () => {
		setSelectedDateOne({
			selected: false,
			dateOne: "",
		});
		setSelectedDateTwo({
			selected: false,
			dateOne: "",
		});
	};

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
				<h1>Bonus Page</h1>
			</header>
			<div className="calendar-box">
				<div className="calendar-container">
					<BonusMyResponsiveCalendar
						data={calanderData}
						setTwoDates={setTwoDates}
					/>
				</div>
			</div>

			<div className="din-vs-lun-main">
				<div className="din-vs-lun--card">
					<p>
						dates Selected : {selectedDateOne.dateOne},{selectedDateTwo.dateTwo}
					</p>
					<p>from data : pre process and feed dates </p>
					<p>to date: pre process and feed dates </p>
					<button onClick={() => submitHandler()}>submit</button>
					<button onClick={() => resetHandler()}>reset</button>
				</div>

				<div className="din-vs-lun--card">
					<div className="din-vs-lun--card--info bonus">
						<span>From Date :</span>
						<p>
							{!dayjs(selectedDateTwo.dateTwo).isBefore(
								dayjs(selectedDateOne.dateOne, "date")
							)
								? dayjs(selectedDateOne.dateOne).format("MMM D, YYYY")
								: dayjs(selectedDateTwo.dateTwo).format("MMM D, YYYY")}
						</p>
					</div>
					<div className="din-vs-lun--card--info bonus">
						<span>To Date :</span>
						<p>
							{dayjs(selectedDateTwo.dateTwo).isBefore(
								dayjs(selectedDateOne.dateOne, "date")
							)
								? dayjs(selectedDateOne.dateOne).format("MMM D, YYYY")
								: dayjs(selectedDateTwo.dateTwo).format("MMM D, YYYY")}
						</p>
					</div>
				</div>
			</div>

			{!showBonusPieNBar ? (
				<div className="din-vs-lun-main">
					<div className="din-vs-lun--card--info">
						<p>Select a valid date to visualize!</p>
					</div>
				</div>
			) : (
				<div className="din-vs-lun-main">
					<div className="din-vs-lun--card">
						<div className="din-vs-lun--card--info">
							<span>Count Of Dates :</span>
							<p>{selectedRangeDateCount}</p>
						</div>
						<div className="din-vs-lun--card--info">
							<span>Total Orders :</span>
							<p> {selectedRangeTotalOrders}</p>
						</div>
					</div>

					<div className="pie-box">
						<div className="pie-container">
							<MyResponsivePie data={selectedRangePieChart} />
						</div>
					</div>
				</div>
			)}

			{/* <div className="cards">
				<div className="pie-container">
					<MyResponsivePie />
				</div> */}

			{!showBonusPieNBar ? (
				<div className="din-vs-lun-main">
					<div className="din-vs-lun--card--info">
						<p>Select a valid date to visualize!</p>
					</div>
				</div>
			) : (
				<div className="schedule-graph-main">
					<div className="bar-graph-container">
						<BonusMyResponsiveBar
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
						<BonusMyResponsiveTimeBar data={selectedTimeBarGraphData} />
					</div>
				</div>
			)}
		</div>
	);
};

export default BonusPage;
