import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
	const [assignmentData, setAssignmentData] = useState([]);
	const [calanderData, setCalanderData] = useState([]);

	console.log(assignmentData);

	return (
		<GlobalContext.Provider
			value={{
				assignmentData,
				setAssignmentData,
				calanderData,
				setCalanderData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
