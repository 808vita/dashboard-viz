import React, { useContext, useEffect } from "react";

import "./App.css";
import { GlobalContext } from "./context/GlobalState";
import BonusPage from "./pages/BonusPage";

import VizPage from "./pages/VizPage";

function App() {
	return (
		<div className="sub-body">
			<div className="main-container">
				{/* <VizPage /> */}
				{/* need router dom here  */}
				<BonusPage />
			</div>
		</div>
	);
}

export default App;
