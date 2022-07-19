import  React,{ useEffect ,useState} from 'react';
import "./Home.css";
import {
    List,
    Input,
  } from "antd";
import "antd/dist/antd.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Cryptoli from './Cryptoli';
import { useQuery } from 'urql';


const QueryAllcrypto = `
query{
    Allcrypto
}
`;

 
function Home() {
    const [dataFragment, setDataFragment] = useState([]);
    const [datavisible, setDatavisible] = useState([]);
    const [filter,setFilter] =  useState("");
    
    const [result, reexecuteQuery] = useQuery({
        query: QueryAllcrypto,
       
      });
    const { data, fetching } = result;

    const handleChange = (e) => {
        e.preventDefault()
        setFilter(e.target.value)
        filterdata()

    }
    const filterdata = () => {
        const regex = new RegExp("^"+filter, 'gi');
        setDatavisible(dataFragment.filter(value => value.match(regex) ))
    }
    useEffect(() => {
        if (fetching) return;
        if( data){
            setDataFragment(data.Allcrypto)
            filterdata()
        }
        
       

        // Set up to refetch in one second, if the query is idle
        const timerId = setTimeout(() => {
          reexecuteQuery({ requestPolicy: 'network-only' });
        }, 1000);
    
        return () => clearTimeout(timerId);

      }, [fetching, reexecuteQuery]);
      





    

    return (
        <div className="Home" id="Home">
        
        <div className="profil1e" id="profil1e">  <div className="addresscontract" id="addresscontract"></div></div>

        <div className="contenant" id="contenant">
        <div className="contenanttable" >
          <Fab className="add" color="primary" aria-label="add">
            {" "}
            <AddIcon />
          </Fab>
          <div className="infinite-container">
            <div className="search">
              <Input
                className="SE"
                placeholder="Search"
                onChange={handleChange}
              />
            </div>
            <List
            
             
            >{ datavisible ? datavisible.map(cyptoname => (<Cryptoli key={cyptoname} name={cyptoname} />)):<p>b</p>}</List>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;