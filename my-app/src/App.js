import "./App.css";

import Home from "./Home.js";
import { Container } from "react-bootstrap";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	
} from "react-router-dom";
import React, { Component } from "react";

import Dasbord from "./Dasbord";

import Pagenotfound from "./Pagenotfound";
import { Provider } from "urql";
import { client } from "../src/urqlClient";


function App() {
	return (
		<div>
			
				<Container>
					<Router>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/cryptocurrency" exact>
								<Provider value={client}>
									<Dasbord />
								</Provider>
							</Route>
							<Route path="*" component={Pagenotfound} />
						</Switch>
					</Router>
				</Container>
	
		</div>
	);
}

export default App;
