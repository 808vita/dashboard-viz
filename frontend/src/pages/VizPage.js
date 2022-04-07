import React, { useContext } from "react";
import MyResponsiveBar from "../components/barGraph/MyResponsiveBar";
import MyResponsiveCalendar from "../components/calendar/MyResponsiveCalendar";
import MyResponsivePie from "../components/cardPies/MyResponsivePie";

import "./VizPage.css";

import { GlobalContext } from "../context/GlobalState";

const VizPage = () => {
	const GContext = useContext(GlobalContext);
	const {
		assignmentData,
		calanderData,
		selectedCalanderDate,
		setSelectedCalanderDate,
	} = GContext;

	return (
		<div className="viz-container">
			<header>
				<h1>Viz Page</h1>
			</header>
			<div className="calendar-box">
				<div className="calendar-container">
					<MyResponsiveCalendar calanderData={calanderData} />
				</div>
			</div>

			<div className="din-vs-lun-main">
				<div className="din-vs-lun--card">
					<div className="din-vs-lun--card--info">
						<span>Selected Date :</span>
						<p>{selectedCalanderDate.day}</p>
					</div>
					<div className="din-vs-lun--card--info">
						<span>Total Orders :</span>
						<p> {selectedCalanderDate.value}</p>
					</div>
				</div>

				<div className="pie-box">
					<div className="pie-container">
						<MyResponsivePie />
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
