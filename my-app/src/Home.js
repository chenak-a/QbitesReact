import React, { useEffect, useState } from "react";
import "./Home.css";
import { List, Input } from "antd";
import "antd/dist/antd.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Cryptoli from "./Cryptoli";
import { useQuery } from "urql";
import { getimage } from "./Cryptoli";

import profile from "./images/group-1.svg";

const QueryAllcrypto = `
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

function Home() {
  const [dataFragment, setDataFragment] = useState([]);
  const [datavisible, setDatavisible] = useState([]);
  const [filter, setFilter] = useState("");
  const [profile, setProfile] = useState("addresscontract");
  const [userinfo, setUserinfo] = useState();
  const [hideprofile, setHideprofile] = useState(false);
  //login
  const user = "chenak";

  const [result, reexecuteQuery] = useQuery({
    query: QueryAllcrypto,
    variables: { nameuser: user },
  });
  const { data, fetching } = result;

  const handleChange = (e) => {
    e.preventDefault();
    const filtername =new RegExp("^" + user +"$", "gim")
 
    if (
      String(e.target.value).match(/[!#$%^&+*(),.?":{}<>]|\[|\]|\\|\//gim) ===
      null
    ) {
      //^chenak$
      if(String(e.target.value).match(filtername) !== null){
        let getname = ""
        userinfo.balance.map((value) => getname += value.cryptoName +"|" )
        setFilter(getname.slice(0,getname.length-1))
      }else{
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
    if (fetching) return;
    if (data) {
      setUserinfo(data.User);


      setDataFragment(data.Allcrypto);
      filterdata();
    }

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [fetching, reexecuteQuery]);
  const profilevisibility = () => {
    var pr =
      profile === "addresscontract" ? "addresscontractexit" : "addresscontract";
    var getstate = hideprofile === true ? false : true;
    setProfile(pr);
    setHideprofile(getstate);
  };
  const getbalance = (d) => {
    
    var balance = d.balance;
    return (
      <div>
        <h2 style={{color: "white"}}>{d.nameuser}</h2>
        {balance
          .sort((a, b) => a.cryptoName.localeCompare(b.cryptoName))
          .map((value) => 
            (
             
              <p>
                {value.cryptoName} : {Number(value.totale).toFixed(2)}{" "}
              </p>
            )
          )}
      </div>
    );
  };
  return (
    <div className="Home" id="Home">
      <div></div>
      <div className="page" id="page">
        <div className="profilemaincontainer" id="profilemaincontainer">
          <div className={profile} id={profile}>
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
                  <Cryptoli key={cyptoname} name={cyptoname} />
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
