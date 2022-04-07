import React, { useContext } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { GlobalContext } from "../../context/GlobalState";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

import { calendarDataSample } from "./calanderDataSample";

const data = calendarDataSample;

const MyResponsiveCalendar = () => {
	// console.log(calanderData);
	const GContext = useContext(GlobalContext);
	const {
		calanderData,

		setSelectedCalanderDate,
	} = GContext;

	return (
		<ResponsiveCalendar
			data={calanderData}
			from="2021-01-01"
			to="2022-12-31"
			emptyColor="#eeeeee"
			onClick={(e) => setSelectedCalanderDate(e.data)}
			colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
			margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
			yearSpacing={40}
			monthBorderColor="#ffffff"
			dayBorderWidth={2}
			dayBorderColor="#ffffff"
			legends={[
				{
					anchor: "bottom-right",
					direction: "row",
					translateY: 36,
					itemCount: 4,
					itemWidth: 42,
					itemHeight: 36,
					itemsSpacing: 14,
					itemDirection: "right-to-left",
				},
			]}
		/>
	);
};

export default MyResponsiveCalendar;
