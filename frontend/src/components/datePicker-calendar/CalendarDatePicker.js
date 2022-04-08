import React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const CalendarDatePicker = ({
	bonusSelectedDayRange,
	setBonusSelectedDayRange,
}) => {
	return (
		<Calendar
			value={bonusSelectedDayRange}
			onChange={setBonusSelectedDayRange}
			shouldHighlightWeekends
		/>
	);
};

export default CalendarDatePicker;
