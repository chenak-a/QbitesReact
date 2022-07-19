import "./App.css";
import { Container } from "react-bootstrap";
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
	//<Container>
	return (
		<div>
			
			
					<Router>
					<Provider value={client}>
						<Switch>
							<Route path="/" exact component={Home} />
							<Container><Route path="/:id" exact component={Dasbord}/></Container>
							
							<Route path="*" component={Pagenotfound} />
						</Switch>
						</Provider>
					</Router>
				
	
		</div>
	);
}

export default App;
