import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SAVE_DELIVERY_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
  BASKET_OPTIONS_SET,
  BASKET_OPTIONS_UPDATE,
  BASKET_OPTIONS_RESET,
} from "../constants/basketConstants";

export const addToBasket = (meal, options) => async (dispatch, getState) => {
  dispatch({
    type: BASKET_ADD_ITEM,
    payload: {
      meal: meal._id,
      name: meal.name,
      image: meal.image,
      price: meal.price,
      countInStock: meal.countInStock,
      options: options,
    },
  });

  localStorage.setItem(
    "basketItems",
    JSON.stringify(getState().basket.basketItems)
  );
};

export const removeFromBasket = (id) => (dispatch, getState) => {
  dispatch({
    type: BASKET_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "basketItems",
    JSON.stringify(getState().basket.basketItems)
  );
};

export const saveDeliveryAddress = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_DELIVERY_ADDRESS,
    payload: data,
  });

  localStorage.setItem("deliveryAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const setDefaultOptions = (options) => (dispatch) => {
  console.log("triggered");
  dispatch({
    type: BASKET_OPTIONS_SET,
    payload: options,
  });
};

export const updateMealOption = (option) => (dispatch) => {
  dispatch({
    type: BASKET_OPTIONS_UPDATE,
    payload: option,
  });
};

export const clearMealOptions = () => (dispatch) => {
  dispatch({
    type: BASKET_OPTIONS_RESET,
  });
};
