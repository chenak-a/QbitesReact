import React, { Component } from "react";

import { Link, useHistory } from "react-router-dom";
import sample from "./images/video (1).mp4";
import "./Home.css";
import Typical from "react-typical";
import { Button } from "react-bootstrap";
class Home extends Component {

	constructor(props) {
		super(props);
		this.state = { showResults: false };

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		if (this.state.showResults === false) this.setState({ showResults: true });
		else {
			this.setState({ showResults: false });
		}
	}
	render() {
		return (
			<div>
				<video className="myVideo" autoPlay loop muted>
					<source src={sample} type="video/mp4" />
				</video>
				<div className="container">
					<div class="wrap" style={{ color: "white" }}>
						<div
							class="text"
							style={{ color: "white", minWidth: "20vh" }}
							data-text="GLITCH"
						>
							{" "}
							Qbites
						</div>
					</div>
					<div className="commente">
						<Typical
							className="comm"
							steps={[
								"",
								1000,
								"Trade with first class artificial intelligence with Ai based indicators at your disposal ",
								100000,
							]}
							loop={Infinity}
							wrapper="h2"
						/>
					</div>
					<div className="bot">
						<Link to="/cryptocurrency">
							<Button className="botin"> start </Button>{" "}
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default Home;
