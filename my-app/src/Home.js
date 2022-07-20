import React, { useEffect, useState } from "react";
import "./Home.css";
import { List, Input } from "antd";
import "antd/dist/antd.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Cryptoli from "./Cryptoli";
import { useQuery } from "urql";
import profile from "./images/group-1.svg";

const QueryAllcrypto = `
query{
    Allcrypto
}
`;

function Home() {
  const [dataFragment, setDataFragment] = useState([]);
  const [datavisible, setDatavisible] = useState([]);
  const [filter, setFilter] = useState("");

  const [result, reexecuteQuery] = useQuery({
    query: QueryAllcrypto,
  });
  const { data, fetching } = result;

  const handleChange = (e) => {
    e.preventDefault();
    if (
      String(e.target.value).match(/[!#$%^&+*(),.?":{}<>]|\[|\]|\\|\//gim) ===
      null
    ) {
      setFilter(e.target.value);
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
      setDataFragment(data.Allcrypto);
      filterdata();
    }

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [fetching, reexecuteQuery]);

  return (
    <div className="Home" id="Home">
     
      <div></div>
      <div className="page" id="page">
        <div className="addresscontract" id="addresscontract">
          <div className="profileclass" id="profileclass">
            aaaa

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
            <Fab className="add" id="add" color="primary" aria-label="add">
              {" "}
              <AddIcon />
            </Fab>
          </div>
    </div>
  );
}

export default Home;
