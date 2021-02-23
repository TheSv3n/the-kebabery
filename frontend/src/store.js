import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { menuToggleReducer } from "./reducers/landingReducers";
import {
  mealListReducer,
  mealDetailsReducer,
  mealCreateReducer,
  mealDeleteReducer,
  mealUpdateReducer,
} from "./reducers/mealReducers";
import { basketReducer, mealOptionsReducer } from "./reducers/basketReducers";
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderUserListReducer,
  orderListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  menuToggle: menuToggleReducer,
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  mealOptions: mealOptionsReducer,
  mealCreate: mealCreateReducer,
  mealDelete: mealDeleteReducer,
  mealUpdate: mealUpdateReducer,
  basket: basketReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderUserList: orderUserListReducer,
  orderList: orderListReducer,
});

const basketItemsFromStorage = localStorage.getItem("basketItems")
  ? JSON.parse(localStorage.getItem("basketItems"))
  : [];

const deliveryAddressFromStorage = localStorage.getItem("deliveryAddress")
  ? JSON.parse(localStorage.getItem("deliveryAddress"))
  : {};

const deliveryCostFromStorage = localStorage.getItem("deliveryCost")
  ? JSON.parse(localStorage.getItem("deliveryCost"))
  : 2.5;

const deliveryMethodFromStorage = localStorage.getItem("deliveryMethod")
  ? JSON.parse(localStorage.getItem("deliveryMethod"))
  : "Delivery";

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "PayPal";

const deliveryTimeFromStorage = localStorage.getItem("deliveryTime")
  ? JSON.parse(localStorage.getItem("deliveryTime"))
  : 0;

const cookTimeFromStorage = localStorage.getItem("cookTime")
  ? JSON.parse(localStorage.getItem("cookTime"))
  : 0;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const menuActiveFromStorage = localStorage.getItem("menuActive")
  ? JSON.parse(localStorage.getItem("menuActive"))
  : "";

const menuToggleFromStorage = localStorage.getItem("menuToggle")
  ? JSON.parse(localStorage.getItem("menuToggle"))
  : false;

const initialState = {
  basket: {
    basketItems: basketItemsFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
    deliveryCost: deliveryCostFromStorage,
    deliveryMethod: deliveryMethodFromStorage,
    deliveryTime: deliveryTimeFromStorage,
    paymentMethod: paymentMethodFromStorage,
    cookTime: cookTimeFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  menuToggle: {
    menuActive: menuActiveFromStorage,
    menuToggle: menuToggleFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
