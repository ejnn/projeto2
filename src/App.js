import startServer from "./mirage.js";

import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import HomePage from "./HomePage.js";
import ProcessConsultationPage from "./ProcessConsultationPage.js";

startServer();

function App() {
    return (

	<Router>

	    <Switch>

		<Route path="/consulta">
		    <ProcessConsultationPage/>
		</Route>

		<Route>
		    <HomePage/>
		</Route>

	    </Switch>

	</Router>
    );
}

export default App;
