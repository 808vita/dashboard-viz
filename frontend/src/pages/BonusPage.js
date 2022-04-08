import React, { useContext } from "react";
import _ from "lodash";
import dayjs from "dayjs";

import { GlobalContext } from "../context/GlobalState";
import CalendarDatePicker from "../components/datePicker-calendar/CalendarDatePicker";

const BonusPage = () => {
	const GContext = useContext(GlobalContext);
	const { assignmentData, bonusSelectedDayRange, setBonusSelectedDayRange } =
		GContext;

	return (
		<div className="viz-container">
			<header>
				<h1>Bonus Page</h1>
			</header>

			<div className="calendar">
				<CalendarDatePicker
					bonusSelectedDayRange={bonusSelectedDayRange}
					setBonusSelectedDayRange={setBonusSelectedDayRange}
				/>
			</div>
		</div>
	);
};

export default BonusPage;
