import React, { useState, useEffect, useRef } from "react";
import { List } from "antd";
import { Button } from "@material-ui/core";
import { useQuery } from "urql";
import { Link } from "react-router-dom";
import "./Cryptoli.css";

const cyptoData = `
query ($name: String!) {
    crypto(name: $name){
      name
      time
      projection
      gainlose{
        M
        W
        D
      }
      data{
        hcl{
          opentime
          Close
        }ai{
          other{
            BUYSELL
            BUYSELLevel
          }
        }
      }
    }
  }
`;
function Cryptoli(props) {
  const [item, setItem] = useState();
  const [previesPrice, setPreviesPrice] = useState();

  const [result, reexecuteQuery] = useQuery({
    query: cyptoData,
    variables: { name: props.name },
  });

  const { data, fetching } = result;
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

 
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  }
  useEffect(() => {
    if (fetching) return;
    if (data !== null) {
      let indexBUYSELLevel = data.crypto.data.length;
      let timesellget = "now";
      var BUYSELLevelget = "start the prayer ";
      for (
        let i = data.crypto.data.length - 1;
        data.crypto.data[i].ai.other.BUYSELL !== 2.0 || i === 0;
        --i
      ) {
        indexBUYSELLevel = i;
      }

      if (data.crypto.data[indexBUYSELLevel - 1].ai.other.BUYSELLevel !== "") {
        BUYSELLevelget =
          data.crypto.data[indexBUYSELLevel - 1].ai.other.BUYSELLevel;
      }
      var now = new Date();
      var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

      timesellget = convertMsToTime(
        utc - data.crypto.data[indexBUYSELLevel - 1].hcl.opentime
      );

      if (timesellget.match(/^../gim) < 4) timesellget += " now";

      var newvalue = {
        name: data.crypto.name,
        time: data.crypto.time,
        projection: data.crypto.projection,
        price: data.crypto.data[result.data.crypto.data.length - 1].hcl.Close,
        BUYSELLevel: BUYSELLevelget,
        timeSell: timesellget,
        gainlose: {
          M: data.crypto.gainlose.M,
          W: data.crypto.gainlose.W,
          D: data.crypto.gainlose.D,
        },
      };
      setPreviesPrice(
        data.crypto.data[result.data.crypto.data.length - 2].hcl.Close
      );

      setItem(newvalue);
    }

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [fetching, reexecuteQuery, props.name]);

  var getimage = (name) => {
    try {
      if ("IOTAUSDT" === name) {
        return (
          <img
            src={
              require(`../node_modules/cryptocurrency-icons/svg/color/miota.svg`)
                .default
            }
            width={30}
          />
        );
      }
      return (
        <img
          src={
            require(`../node_modules/cryptocurrency-icons/svg/color/${
              name.toLowerCase().match("[a-z]*(?=usdt)") + ".svg"
            }`).default
          }
          width={30}
        />
      );
    } catch {
      return (
        <img
          src={
            require(`../node_modules/cryptocurrency-icons/svg/black/gold.svg`)
              .default
          }
          width={30}
        />
      );
    }
  };
  return item ? (
    <div className="h-75 d-inline-block w-100 text-center mt-2" id="Dashbord">
      <List.Item className="text-center" key={item.name}>
        <List.Item.Meta
          className="itemname"
          avatar={getimage(item.name)}
          title={item.name}
          description={item.time}
        />
        <List.Item.Meta
          title={<a>Price</a>}
          description={
            <a
              style={
                previesPrice > item.price
                  ? { color: "red" }
                  : { color: "green" }
              }
            >
              {item.price.toString()}
            </a>
          }
        />
        <List.Item.Meta
          title={<a>Projection</a>}
          description={
            <a
              style={
                item.projection < 0 ? { color: "red" } : { color: "green" }
              }
            >
              {item.projection.toString()}
            </a>
          }
        />
        <List.Item.Meta
          title={<a>M/W/D</a>}
          description={
            <a>
              <a
                style={
                  item.gainlose.M < 0 ? { color: "red" } : { color: "green" }
                }
              >
                {item.gainlose.M.toFixed(2).toString() + "/"}
              </a>
              <a
                style={
                  item.gainlose.W < 0 ? { color: "red" } : { color: "green" }
                }
              >
                {item.gainlose.W.toFixed(2).toString() + "/"}
              </a>
              <a
                style={
                  item.gainlose.D < 0 ? { color: "red" } : { color: "green" }
                }
              >
                {item.gainlose.D.toFixed(2).toString()}
              </a>
            </a>
          }
        />
        <List.Item.Meta
          title={<a>Sell</a>}
          description={
            <a>
              <a
                style={
                  Number(String(item.BUYSELLevel).match(/[0-9]/gim)) <= 5
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {item.BUYSELLevel + "/"}
              </a>
              <a>{item.timeSell}</a>
            </a>
          }
        />
        <List.Item.Meta
          title={
            item.projection <= 0 ? (
              <Button
                href={`/${item.name}`}
                size="small"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "18px",
                }}
                variant="contained"
              >
                Trade
              </Button>
            ) : (
              <Button
                href={`/${item.name}`}
                size="small"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "18px",
                }}
                variant="contained"
              >
                Trade
              </Button>
            )
          }
        />
      </List.Item>{" "}
    </div>
  ) : (
    <p></p>
  );
}

export default Cryptoli;
