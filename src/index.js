import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HomePage from "./HomePage";

import GlobalState from "./context/GlobalState";

ReactDOM.render(
	<React.StrictMode>
		<GlobalState>
			<HomePage />
		</GlobalState>
	</React.StrictMode>,
	document.getElementById("root")
);
