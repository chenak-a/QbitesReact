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
const combien = combineReducers({
    profile,
    pricevs,
  });
const store = createStore(
    combien,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default store;