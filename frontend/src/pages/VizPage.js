import React from "react";
import MyResponsiveBar from "../components/barGraph/MyResponsiveBar";
import MyResponsiveCalendar from "../components/calendar/MyResponsiveCalendar";
import MyResponsivePie from "../components/cardPies/MyResponsivePie";

import "./VizPage.css";

const VizPage = () => {
	return (
		<div className="viz-container">
			<header>
				<h1>Viz Page</h1>
			</header>
			<div className="calendar-box">
				<div className="calendar-container">
					<MyResponsiveCalendar />
				</div>
			</div>

			<div className="din-vs-lun-main">
				<div className="din-vs-lun--card">
					<div className="din-vs-lun--card--info">
						<span>Selected Date :</span>
						<p>THU, 7th APR 2022</p>
					</div>
					<div className="din-vs-lun--card--info">
						<span>Total Orders :</span>
						<p> 200</p>
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
