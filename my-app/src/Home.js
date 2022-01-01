import React, { Component } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import { Link, useHistory } from "react-router-dom";
import sample from "./images/video (1).mp4";
import "./Home.css";
import Typical from "react-typical";
import { Button } from "react-bootstrap";
class Home extends Component {
	/*  <div id="op">
                        <div className="d-flex align-items-center justify-content-center"
                            style={{ minHeight: "110vh" }} id="in"  >
                            <div className="w-100" style={{ maxWidth: "400px" }}>
                                <div >
                                    {!this.state.showResults ? <Signin /> : null}
                                    <div className="w-100 text-center mt-2" style={this.state.showResults ? { display: 'none' } : { position: "relative", color: "white" }} >
                                        Need an account? <Link onClick={this.handleClick} >Sign Up</Link>
                                    </div>
                                </div>
                                <div>
                                    {this.state.showResults ? <Signup handle={this.handleClick} /> : null}
                                    <div className="w-100 text-center mt-2" style={this.state.showResults ? { position: "relative", color: "white" } : { display: 'none' }}>
                                        Already have an account? <Link onClick={this.handleClick} >Log In</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */
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
