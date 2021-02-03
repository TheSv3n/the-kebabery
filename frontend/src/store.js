import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { menuToggleReducer } from "./reducers/landingReducers";
import { mealListReducer, mealDetailsReducer } from "./reducers/mealReducers";
import { basketReducer, mealOptionsReducer } from "./reducers/basketReducers";
import { userLoginReducer } from "./reducers/userReducers";
import { orderCreateReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  menuToggle: menuToggleReducer,
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  mealOptions: mealOptionsReducer,
  basket: basketReducer,
  userLogin: userLoginReducer,
  orderCreate: orderCreateReducer,
});

const basketItemsFromStorage = localStorage.getItem("basketItems")
  ? JSON.parse(localStorage.getItem("basketItems"))
  : [];

const deliveryAddressFromStorage = localStorage.getItem("deliveryAddress")
  ? JSON.parse(localStorage.getItem("deliveryAddress"))
  : {};

const deliveryCostFromStorage = localStorage.getItem("deliveryCost")
  ? JSON.parse(localStorage.getItem("deliveryCost"))
  : 0;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  basket: {
    basketItems: basketItemsFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
    deliveryCost: deliveryCostFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
