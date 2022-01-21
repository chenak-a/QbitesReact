import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "./AuthContexte";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "urql";
import { client, ssrCache } from "./urqlClient";
import Graphs from "./graphh";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { useDetectAdBlock } from "adblock-detect-react";
import { AdBlockDetectedWrapper } from "adblock-detect-react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Alert } from "antd";
import TextLoop from "react-text-loop";

const TodosQuery = `
query {
  crypto {
    name
    time
		data{
    hcl{
      opentime
      Open
      High
      Low
      Close
    	Volume
      
    }
      formula{
        rsi
        rsiK
        rsiD
        aroonu
        aroond
        macd
        histogram
       
      }
      ai{
        bigmome{
          BUY2
          BUY1
          ambi
        }
        sell{
          amb0
          amb1
          amb2
          amb3
          amb99
        }
        smallmome{
          amo
          ci
        }
        buy{
          ambb
          ambb5
          ww6
          ww7
        }
        mome{
          amb14
          amb15
          amb13
          amb55
        }
        other{
          amo
          amo1
          BUYSELL
        }
      }
    }
  }
}
`;
export default function Dashboard() {
	const adBlockDetected = useDetectAdBlock();

	const [result, reexecuteQuery] = useQuery({
		query: TodosQuery,
	});
	const { data, fetching, err } = result;

	const refresh = () => {
		// Refetch the query and skip the cache
		reexecuteQuery({ requestPolicy: "cache-and-network" });
	};

	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	async function handleLogout() {
		setError("");

		try {
			await logout();
			history.push("/");
		} catch {
			setError("Failed to log out");
		}
	}
	useEffect(() => {
		if (result.fetching) return;

		// Set up to refetch in one second, if the query is idle
		const timerId = setTimeout(() => {
			reexecuteQuery({ requestPolicy: 'network-only' });
		}, 1000);

		return () => clearTimeout(timerId);
	}, [result.fetching, reexecuteQuery]);
	/*     <AdBlockDetectedWrapper>
              <div>{"please disable adblock"}</div>
          </AdBlockDetectedWrapper> */
	return (
		<>
			<Card>
				<Alert
					style={{ position: "absolute", width: "100%" }}
					message="This Demo is only for demonstration purposes trade at your own risk"
					type="info"
					closeText="Close Now"
				/>

				<Card.Body>
					<div></div>
					<h2 className="text-center mb-1   ">
						{ data != null
							? data.crypto.map((data) => data.name + " " + data.time)
							: "Profile"}
					</h2>
					{error && <Alert variant="danger">{error}</Alert>}

					<div></div>
				</Card.Body>
				<Button
					style={{ position: "absolute", top: "30%" }}
					variant="link"
					onClick={handleLogout}
				>
					Back
				</Button>
				<Alert
					banner
					message={
						<TextLoop mask springConfig={{ stiffness: 200, damping: 10 }}>
							<div>Created by: Anonymous</div>
							<div className="te">
								Support Us with a Donation: BTC
								1594CK3dsQvJ8cQk8g3NFNMu2YfzZ1BVxH || ETH
								0x9092d14fd31b03ffb0f81423d2f795af6be0ef4c{" "}
							</div>
							<div>Good luck</div>
							<div>Email : qbites.live@gmail.com</div>
						</TextLoop>
					}
				/>
			</Card>

			<div className="h-75 d-inline-block w-100 text-center mt-2">
				<div>
					<pre>
						{data == null
							? "loading"
							: data.crypto.map((data) => (
									<Graphs
										style={{ transition: "scale 1s" }}
										key="{data}"
										data={data}
									/>
							  ))}
					</pre>
				</div>
			</div>
		</>
	);
}
