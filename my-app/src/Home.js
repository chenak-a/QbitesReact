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
  
  const [childdata, setChilddata] = useState();


  const [listchilddata, setListchilddata] = useState(new Map());
  const hideprofile = useSelector(state => state.profile.hide)
  const hideprice = useSelector(state => state.pricevs.hide)
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
  const filterdata = () => {
    const regex = new RegExp("^" + filter, "gi");
    setDatavisible(dataFragment.filter((value) => value.match(regex)));
  };
  useEffect(() => {
    if (childdata) {
      setListchilddata(listchilddata.set(childdata.name, childdata));
    }
  }, [childdata]);

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
      if (listchilddata.has(value.cryptoName)) {
        M += listchilddata.get(value.cryptoName).gainlose.M;
        W += listchilddata.get(value.cryptoName).gainlose.W;
        D += listchilddata.get(value.cryptoName).gainlose.D;
      }
    });
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
            {balance
              .sort((a, b) => a.cryptoName.localeCompare(b.cryptoName))
              .map((value) => (
                <List.Item key={value.cryptoName}>
                  <List.Item.Meta
                    className="text-sky-400"
                    avatar={getimage(value.cryptoName, "white", 25)}
                    title={
                      <div>
                        <h4
                          className="ant-list-item-meta-title"
                          style={{ color: "white" }}
                        >
                          {value.cryptoName}
                        </h4>
                      </div>
                    }
                    description={
                      <p style={{ color: "white" }}>
                        { !hideprice ? Number(value.totale).toFixed(2) :"00.00"} $
                     
                      </p>
                    }
                  />
                  {listchilddata.has(value.cryptoName) ? (
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
                          <a
                            style={
                              listchilddata.get(value.cryptoName).gainlose.M < 0
                                ? { color: "red" }
                                : { color: "green" }
                            }
                          >
                            {listchilddata
                              .get(value.cryptoName)
                              .gainlose.M.toFixed(2)
                              .toString()}
                          </a>
                          <a style={{ color: "white" }}> / </a>
                          <a
                            style={
                              listchilddata.get(value.cryptoName).gainlose.W < 0
                                ? { color: "red" }
                                : { color: "green" }
                            }
                          >
                            {listchilddata
                              .get(value.cryptoName)
                              .gainlose.W.toFixed(2)
                              .toString()}
                          </a>
                          <a style={{ color: "white" }}> / </a>
                          <a
                            style={
                              listchilddata.get(value.cryptoName).gainlose.D < 0
                                ? { color: "red" }
                                : { color: "green" }
                            }
                          >
                            {listchilddata
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
            <List.Item key={"total"}>
              <List.Item.Meta
                 className="text-sky-400"
                title={
                  <div>
                    <h4 style={{ color: "white", marginTop: "2vh" }}>Total</h4>
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
          <div className={!hideprofile ? "addresscontract": "addresscontractexit"} id={!hideprofile ? "addresscontract": "addresscontractexit"}>
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
                    passChildData={setChilddata}
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
