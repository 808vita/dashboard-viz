import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import "./App.css";
import BonusPage from "./pages/BonusPage";

import VizPage from "./pages/VizPage";

function App() {
	const GContext = useContext(GlobalContext);
	const { showVizPage, setShowVizPage, showBonusPage, setShowBonusPage } =
		GContext;

	const showToggler = () => {
		setShowVizPage(!showVizPage);
		setShowBonusPage(!showBonusPage);
	};

	return (
		<div className="sub-body">
			<div className="main-container">
				<div>
					<button onClick={(e) => showToggler()}>
						{showVizPage ? `Bonus Task =>` : `<= Viz Page`}
					</button>
				</div>
				{showVizPage && <VizPage />}

				{showBonusPage && <BonusPage />}
			</div>
		</div>
	);
}

export default App;
