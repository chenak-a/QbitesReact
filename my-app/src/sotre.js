import { combineReducers ,createStore } from "redux";
const profile = (state = { hide : false}, action) => {
    switch (action.type) {
      case "hideprofile":
        return {hide : !state.hide};
      default:
        return state;
    }
  };


const pricevs = (state = { hide : true}, action) => {
    switch (action.type) {
      case "pricevs":
        return {hide : !state.hide};
      default:
        return state;
    }
  };
  const datastate = (state = { data : new Map()}, action) => {
    switch (action.type) {
      case "datastate":
        return {data : action.payload };
      default:
        return state;
    }
  };
const combien = combineReducers({
    profile,
    pricevs,
    datastate,
  });
const store = createStore(
    combien,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default store;