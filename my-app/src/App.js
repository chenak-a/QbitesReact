import "./App.css";

import Home from "./Home.js";
import { Container } from "react-bootstrap";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import React, { Component } from "react";
import { AuthProvider } from "./AuthContexte";
import Dasbord from "./Dasbord";
import PrivetRoute from "./PriveteRoute";
import ForgotPassword from "./ForgotPassword";
import Pagenotfound from "./Pagenotfound";
import { Provider } from "urql";
import { client, ssrCache } from "../src/urqlClient";

class App extends Component {
	/*       <Route path="/auth" component={Home} />
                <Route path="/ForgotPassword" component={ForgotPassword} />
                
                <Provider value={client}><PrivetRoute path="/" component={dasbord} /></Provider>
                 */
	render() {
		return (
			<AuthProvider>
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
			</AuthProvider>
		);
	}
}

export default App;
