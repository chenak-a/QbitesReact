import React, { useEffect, useState } from "react";
import "./Home.css";
import { List, Input } from "antd";
import "antd/dist/antd.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Cryptoli from "./Cryptoli";
import { useQuery } from "urql";
import { getimage } from "./Cryptoli";
import { useSelector, useDispatch } from 'react-redux'

import { Link } from "react-router-dom";
const QueryAllcryptouser = `
query( $nameuser: String!){
    Allcrypto
    User(nameuser: $nameuser) {
      nameuser
      balance {
        cryptoName
        totale
      }
    }
}

`;
const QueryAllcrypto = `
query{
    Allcrypto
    
}

`;

function Home() {
  const [dataFragment, setDataFragment] = useState([]);
  const [datavisible, setDatavisible] = useState([]);
  const [filter, setFilter] = useState("");
  const [userinfo, setUserinfo] = useState();
  const [sorttable ,setSorttable] = useState("");
  const [sortprofile ,setSortprofile] = useState("");

  const [profilehidetype ,setProfilehidetype]= useState("");
  const hideprofile = useSelector(state => state.profile.hide)
  const hideprice = useSelector(state => state.pricevs.hide)
  const datastate = useSelector(state => state.datastate.data)
 
  const dispatch = useDispatch()
  
  //login
  const user = "chenak";

  const [result, reexecuteQuery] = useQuery({
    query: QueryAllcryptouser,
    variables: { nameuser: user },
  });
  const { data, fetching } = result;

  const handleChange = (e) => {
    e.preventDefault();
    const filtername = new RegExp("^" + user + "$", "gim");

    if (
      String(e.target.value).match(/[!#$%^&+*(),.?":{}<>]|\[|\]|\\|\//gim) ===
      null
    ) {
      if (String(e.target.value).match(filtername) !== null) {
        let getname = "";
        userinfo.balance.map((value) => (getname += value.cryptoName + "|"));
        setFilter(getname.slice(0, getname.length - 1));
      } else {
        setFilter(e.target.value);
      }
      
      filterdata();
    } else {
      setFilter(" ");
    }
  };
  const sortmaintable = (d) =>{
      if(sorttable === "price" && datastate.length !==0){
        try {
          return d.sort((a,b) => datastate.get(b).price-datastate.get(a).price)
        }
        catch{

        }
      }else if(sorttable === "projection" && datastate.length !==0){
        try {
          return d.sort((a,b) => datastate.get(b).projection-datastate.get(a).projection)
        }catch{

        }
      }else if(sorttable === "D" && datastate.length !==0){
        try {
        return d.sort((a,b) => datastate.get(b).gainlose.D-datastate.get(a).gainlose.D)
        }catch{

        }
      }else if(sorttable === "W" && datastate.length !==0){
        try {
        return d.sort((a,b) => datastate.get(b).gainlose.W-datastate.get(a).gainlose.W)
        }catch{

        }
      }else if(sorttable === "M" && datastate.length !==0){
        try{

          return d.sort((a,b) => datastate.get(b).gainlose.M-datastate.get(a).gainlose.M)
        }catch{

        }
      }
      return d
  }
  const filterdata = () => {
    const regex = new RegExp("^" + filter, "gi");
    setDatavisible(sortmaintable(dataFragment,sorttable).filter((value) => value.match(regex)));
  };
  const filterprofile = (d)=>{
    if(sortprofile === "M" && datastate.length !==0){
      try {
        return d.sort((a,b)=> datastate.get(b.cryptoName).gainlose.M - datastate.get(a.cryptoName).gainlose.M  )
        
        
      }
      catch{

      }
    }else  if(sortprofile === "W" && datastate.length !==0){
      try {
        return d.sort((a,b)=> datastate.get(b.cryptoName).gainlose.W - datastate.get(a.cryptoName).gainlose.W  )
        
        
      }
      catch{

      }
    }else  if(sortprofile === "D" && datastate.length !==0){
      try {
        return d.sort((a,b)=> datastate.get(b.cryptoName).gainlose.D - datastate.get(a.cryptoName).gainlose.D  )
        
        
      }
      catch{

      }
    }
    return d
  }
 

  useEffect(() => {
    if (fetching) return;
    if (data) {
      setUserinfo(data.User);

      setDataFragment(data.Allcrypto);
      filterdata();

      setUserinfo(data.User);
    }

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [fetching, reexecuteQuery]);
  const profilevisibility = () => {
  
    setProfilehidetype("addresscontractexit")
    dispatch({ type: 'hideprofile' })
    
  };
  const getbalance = (d) => {
    var balance = d.balance;
    var total = 0;
    var M = 0;
    var W = 0;
    var D = 0;
    balance.map((value) => {
      total += value.totale;
      if (datastate.has(value.cryptoName)) {
        console.log((datastate.get(value.cryptoName).gainlose.M)/100)
        M += value.totale/(1+(datastate.get(value.cryptoName).gainlose.M/100));
        W += value.totale/(1+(datastate.get(value.cryptoName).gainlose.W/100));
        D += value.totale/(1+(datastate.get(value.cryptoName).gainlose.D/100));
      }
    });
    M = ((total-M)/M)*100
    W = ((total-W)/W)*100
    D = ((total-D)/D)*100

    const hidepricefunc = () => {
    
     
      dispatch({ type: 'pricevs' })
    }
    return (
      <div className="listall" id="listall">
        <div
          style={{
            marginBottom: "5vh",
            marginLeft: "3vw",
            display: "grid",
            gridTemplateColumns: "20% auto",
          }}
        >
          {" "}
          {
            !hideprice ? 
            <img
            onClick={hidepricefunc}
            src={ require("./images/imageedit_1_5449003570.png").default}
            style={{ width: "40px" }}
          />:<img
          onClick={hidepricefunc}
          src={ require("./images/imageedit_4_5917412648.png").default}
          style={{ width: "40px" }}
        />
          }
          
          <h2 style={{ color: "white" }}>{d.nameuser}</h2>
        </div>
        <div className="listprofile" id="listprofile">
          <List>
            {filterprofile(balance
              .sort((a, b) => b.totale-a.totale))
              .map((value) => (
                <List.Item key={value.cryptoName}>
                  <List.Item.Meta
                    className="text-sky-400"
                    avatar={getimage(value.cryptoName, "white", 25)}
                    title={
                      <div>
                        <a
                          className="ant-list-item-meta-title"
                          style={{ color: "white" }}
                        >
                           <Link  style={{color: "white",background: "transparent"}} to={value.cryptoName}>
                          {value.cryptoName}
                          </Link>
                        </a>
                      </div>
                    }
                    description={
                      <a  onClick={() =>setSortprofile("")}  style={{ color: "white" }}>
                        { !hideprice ? Number(value.totale).toFixed(2) :"00.00"} $
                     
                      </a>
                    }
                  />
                  {datastate.has(value.cryptoName) ? (
                    <List.Item.Meta
                      title={
                        <div>
                          <h4
                            className="ant-list-item-meta-title"
                            style={{ color: "white" }}
                          >
                            M/W/D
                          </h4>
                        </div>
                      }
                      description={
                        <div>
                          <a onClick={() =>setSortprofile("M")}
                            style={
                              datastate.get(value.cryptoName).gainlose.M < 0
                                ? { color: "red" }
                                : datastate.get(value.cryptoName).gainlose.M > M ? { color: "green" } : { color: "yellow" } 
                            }
                          >
                            {datastate
                              .get(value.cryptoName)
                              .gainlose.M.toFixed(2)
                              .toString()}
                          </a>
                          <a style={{ color: "white" }}> / </a>
                          <a onClick={() =>setSortprofile("W")}
                            style={
                              datastate.get(value.cryptoName).gainlose.W < 0
                                ? { color: "red" }
                                :  datastate.get(value.cryptoName).gainlose.W > W ? { color: "green" } : { color: "yellow" } 
                            }
                          >
                            {datastate
                              .get(value.cryptoName)
                              .gainlose.W.toFixed(2)
                              .toString()
                              }
                          </a>
                          <a style={{ color: "white" }}> / </a>
                          <a onClick={() =>setSortprofile("D")}
                            style={
                              datastate.get(value.cryptoName).gainlose.D < 0
                                ?  { color: "red" }
                                : datastate.get(value.cryptoName).gainlose.D > D ? { color: "green" } : { color: "yellow" } 
                            }
                          >
                            {datastate
                              .get(value.cryptoName)
                              .gainlose.D.toFixed(2)
                              .toString()}
                          </a>
                        </div>
                      }
                    />
                  ) : (
                    <p></p>
                  )}
                </List.Item>
              ))}
          </List>
         
        </div>
        <div className="total" id="total">
        <List>
            <List.Item style={{marginTop:"10%"}} key={"total"}>
              <List.Item.Meta 
                 className="text-sky-400"
                title={
                  <div ><h4>
                    <a style={{ color: "white", marginTop: "2vh" }}>Total</a>
                    </h4>
                  </div>
                }
                description={
                  <div>
                    <h4
                      className="ant-list-item-meta-title"
                      style={{ color: "white" }}
                    >
                      { !hideprice ? total.toFixed(2) :"00.00"} $
                    </h4>
                  </div>
                }
              />

              <List.Item.Meta
              style={{position :"relative"}}
                title={
                  <div>
                    <h4
                      className="ant-list-item-meta-title"
                      style={{ color: "white" }}
                    >
                      M/W/D
                    </h4>
                  </div>
                }
                description={
                  <div >
                    <a style={M < 0 ? { color: "red"  } : { color: "green" }}>
                      {M.toFixed(2).toString()}
                    </a>
                    <a style={{ color: "white" }}> / </a>
                    <a style={W < 0 ? { color: "red" } : { color: "green" }}>
                      {W.toFixed(2).toString()}
                    </a>
                    <a style={{ color: "white" }}> / </a>
                    <a style={D < 0 ? { color: "red" } : { color: "green" }}>
                      {D.toFixed(2).toString()}
                    </a>
                  </div>
                }
              />
            </List.Item>
          </List>
          </div>
      </div>
    );
  };

  return (
    <div className="Home" id="Home">
      <div></div>
      <div className="page" id="page">
        <div className="profilemaincontainer" id="profilemaincontainer">
          <div className={!hideprofile ? "addresscontract": profilehidetype} id={!hideprofile ? "addresscontract": profilehidetype}>
            <div className="profileclass" id="profileclass">
              {userinfo && !hideprofile ? getbalance(userinfo) : <p></p>}
            </div>
          </div>
        </div>

        <div className="contenanttable" id="contenanttable">
          <div className="infinite-container" id="infinite-container">
            <div className="search">
              <Input
                className="SE"
                placeholder="Search"
                onChange={handleChange}
              />
            </div>
            <List>
              {datavisible ? (
                datavisible.map((cyptoname) => (
                  <Cryptoli
                    sort ={setSorttable}
                    key={cyptoname}
                    name={cyptoname}
                  />
                ))
              ) : (
                <p>b</p>
              )}
            </List>
          </div>
        </div>
      </div>
      <div className="addconaitner" id="addconaitner">
        <Fab
          className="add"
          id="add"
          color="primary"
          aria-label="add"
          onClick={profilevisibility}
        >
          {" "}
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Home;
