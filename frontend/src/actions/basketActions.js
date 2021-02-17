import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_UPDATE_DELIVERY_COST,
  BASKET_UPDATE_COOK_TIME,
  BASKET_SAVE_DELIVERY_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
  BASKET_ITEMS_RESET,
  BASKET_OPTIONS_SET,
  BASKET_OPTIONS_UPDATE,
  BASKET_OPTIONS_RESET,
  BASKET_OPTIONS_CALC_COST,
  BASKET_UPDATE_DELIVERY_METHOD,
  BASKET_UPDATE_DELIVERY_TIME,
} from "../constants/basketConstants";

const calculateCookTime = () => async (dispatch, getState) => {
  let tempItems = getState().basket.basketItems;
  let tempCookTime = 0;
  for (let i = 0; i < tempItems.length; i++) {
    if (tempItems[i].cookTime > tempCookTime) {
      tempCookTime = tempItems[i].cookTime;
    }
  }
  dispatch({ type: BASKET_UPDATE_COOK_TIME, payload: tempCookTime });

  localStorage.setItem("cookTime", JSON.stringify(getState().basket.cookTime));
};

export const addToBasket = (meal, options, optionsTotal) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: BASKET_ADD_ITEM,
    payload: {
      meal: meal._id,
      name: meal.name,
      image: meal.image,
      price: meal.price,
      countInStock: meal.countInStock,
      options: options,
      cookTime: meal.cookTime,
      optionsPrice: optionsTotal,
      totalPrice: optionsTotal + meal.price,
    },
  });

  localStorage.setItem(
    "basketItems",
    JSON.stringify(getState().basket.basketItems)
  );

  dispatch(calculateCookTime());
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
  dispatch(calculateCookTime());
};

export const saveDeliveryAddress = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_DELIVERY_ADDRESS,
    payload: data,
  });

  localStorage.setItem("deliveryAddress", JSON.stringify(data));
};

export const updateDeliveryCost = (data) => (dispatch) => {
  dispatch({
    type: BASKET_UPDATE_DELIVERY_COST,
    payload: data,
  });
  localStorage.setItem("deliveryCost", JSON.stringify(data));
};

export const updateDeliveryTime = (data) => (dispatch) => {
  dispatch({
    type: BASKET_UPDATE_DELIVERY_TIME,
    payload: data,
  });
  localStorage.setItem("deliveryTime", JSON.stringify(data));
};

export const updateDeliveryMethod = (data) => (dispatch) => {
  dispatch({
    type: BASKET_UPDATE_DELIVERY_METHOD,
    payload: data,
  });
  localStorage.setItem("deliveryMethod", JSON.stringify(data));
};

export const clearBasketItems = () => (dispatch, getState) => {
  dispatch({
    type: BASKET_ITEMS_RESET,
  });
  localStorage.setItem(
    "basketItems",
    JSON.stringify(getState().basket.basketItems)
  );
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const setDefaultOptions = (options) => (dispatch) => {
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
  dispatch(calculateOptionCost());
};

export const clearMealOptions = () => (dispatch) => {
  dispatch({
    type: BASKET_OPTIONS_RESET,
  });
  dispatch(calculateOptionCost());
};

export const calculateOptionCost = () => (dispatch) => {
  dispatch({
    type: BASKET_OPTIONS_CALC_COST,
  });
};
