import React, { useContext, useEffect } from "react";

import "./App.css";
import { GlobalContext } from "./context/GlobalState";

import VizPage from "./pages/VizPage";

function App() {
	return (
		<div className="sub-body">
			<div className="main-container">
				<VizPage />
			</div>
		</div>
	);
}

export default App;
