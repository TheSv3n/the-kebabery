import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { menuToggleReducer } from "./reducers/landingReducers";
import { mealListReducer } from "./reducers/mealReducers";

const reducer = combineReducers({
  menuToggle: menuToggleReducer,
  mealList: mealListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
