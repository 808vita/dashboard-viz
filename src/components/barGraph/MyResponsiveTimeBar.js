// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// import { barGraphSampleData } from "./barGraphDataSample";

// const data = barGraphSampleData;

const MyResponsiveTimeBar = ({ data }) => (
	<ResponsiveBar
		data={data}
		onClick={(e) => console.log(e)}
		keys={["Dinner", "Lunch"]}
		indexBy="time"
		margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
		padding={0.3}
		valueScale={{ type: "linear" }}
		indexScale={{ type: "band", round: true }}
		colors={{ scheme: "nivo" }}
		defs={[
			{
				id: "lines",
				type: "patternLines",
				background: "inherit",
				color: "#eecda0",
				rotation: -45,
				lineWidth: 6,
				spacing: 10,
			},
			{
				id: "dots",
				type: "patternDots",
				background: "inherit",
				color: "rgba(255, 255, 255, 0.3)",
				size: 4,
				padding: 1,
				stagger: true,
			},
		]}
		fill={[
			{
				match: {
					id: "Dinner",
				},
				id: "dots",
			},
		]}
		borderColor={{
			from: "color",
			modifiers: [["darker", 1.6]],
		}}
		axisTop={null}
		axisRight={null}
		axisBottom={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: "Schedule time",
			legendPosition: "middle",
			legendOffset: 32,
		}}
		axisLeft={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: "Orders",
			legendPosition: "middle",
			legendOffset: -40,
		}}
		labelSkipWidth={12}
		labelSkipHeight={12}
		labelTextColor={{
			from: "color",
			modifiers: [["darker", 1.6]],
		}}
		legends={[
			{
				dataFrom: "keys",
				anchor: "bottom-right",
				direction: "column",
				justify: false,
				translateX: 120,
				translateY: 0,
				itemsSpacing: 2,
				itemWidth: 100,
				itemHeight: 20,
				itemDirection: "left-to-right",
				itemOpacity: 0.85,
				symbolSize: 20,
				effects: [
					{
						on: "hover",
						style: {
							itemOpacity: 1,
						},
					},
				],
			},
		]}
		role="application"
		ariaLabel="Nivo bar chart demo"
		barAriaLabel={function (e) {
			return e.id + ": " + e.formattedValue + " in Time: " + e.indexValue;
		}}
	/>
);

export default MyResponsiveTimeBar;
