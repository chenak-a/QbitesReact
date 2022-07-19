import React ,{ useState, useEffect } from "react";
import { useQuery } from "urql";
import { useHistory ,useParams } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import Graph from "./Graph";



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

`
function Dashbord() {
  const { id } = useParams()
  
    const nameCypto = String(id).toUpperCase();
 
    const [oldData, setOld] = useState();
    const [result, reexecuteQuery] = useQuery({
      query: allDataCrypto,
      variables:{name:nameCypto}
      });
    const { data, fetching ,error} = result;
    

  const navigate = useHistory()

  
    useEffect(() => {
        if (fetching ) return;
        if(error) navigate.push("/")
        if(data) setOld(data.crypto);
 
    
        
        const timerId = setTimeout(() => {

            reexecuteQuery({requestPolicy: 'network-only'});

        }, 1000);
        return () => clearTimeout(timerId);
       
    
    }, [fetching,reexecuteQuery]);


	


    return (

        <div >
        <Card.Body>
					
					<h2 className="text-center mb-1   ">
						{ oldData
							? oldData.name + " " +oldData.time
							: "Profile"}
					</h2>
				

				
				</Card.Body>
    
        <div className="h-75 d-inline-block w-100 text-center mt-2">
				<div>
					<pre>
						{ oldData   ?  
				
								<Graph
								style={{ transition: "scale 1s" }}
								key={oldData}
								data={oldData}
							/>
							: "Loding ..."
							}
					</pre>
				</div>
			</div>
            </div>
    );
}

export default Dashbord;