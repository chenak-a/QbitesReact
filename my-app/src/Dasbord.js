import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import { useHistory, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Graph from "./Graph";
import Container from "react-bootstrap/Container";
import "./Dasbord.css"
const allDataCrypto = `
query ($name: String!){
    crypto(name: $name){
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
            BUYSELLevel
            
          }
          
        }
      }
    }
  }

`;
function Dashbord() {
  const { id } = useParams();

  const nameCypto = String(id).toUpperCase();

  const [oldData, setOld] = useState();
  const [result, reexecuteQuery] = useQuery({
    query: allDataCrypto,
    variables: { name: nameCypto },
  });
  const { data, fetching, error } = result;


  const navigate = useHistory();

  useEffect(() => {
    if (fetching) return;
    if (error) navigate.push("/");
    if (data !== null) setOld(data.crypto);

    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, 1000);
    return () => clearTimeout(timerId);
  }, [fetching, reexecuteQuery]);

  
  return (
    <div className="Dashbord" id="Dashbord" >
      <Card.Body className="   text-center  ">
        <h2 >
          {oldData ? oldData.name + " " + oldData.time : "Profile"}
        </h2>
      </Card.Body>
       <div className="raper" id="raper">
      {oldData  ? (
          <Graph
            style={{ transition: "scale 1s" }}
            key={oldData}
            data={oldData}
          />
        ) : (
          "Loding ..."
        )}
      </div>
    </div>
  );
}

export default Dashbord;
