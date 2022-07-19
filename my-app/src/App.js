import "./App.css";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	
} from "react-router-dom";
import React, { Component } from "react";
import Home from "./Home"
import Dasbord from "./Dasbord";

import Pagenotfound from "./Pagenotfound";
import { Provider } from "urql";
import { client } from "../src/urqlClient";
function App() {

	return (
		<div>
			
			
					<Router>
					<Provider value={client}>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/:id" exact component={Dasbord}/>
							
							<Route path="*" component={Pagenotfound} />
						</Switch>
						</Provider>
					</Router>
				
	
		</div>
	);
}

export default App;
