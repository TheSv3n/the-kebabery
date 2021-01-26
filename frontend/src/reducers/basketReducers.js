import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SAVE_DELIVERY_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
} from "../constants/basketConstants";

export const basketReducer = (
  state = { basketItems: [], deliveryAddress: {} },
  action
) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      const item = action.payload;

      return {
        ...state,
        basketItems: [...state.basketItems, item],
      };

    case BASKET_REMOVE_ITEM:
      return {
        ...state,
        basketItems: state.basketItems.filter((x) => x.meal !== action.payload),
      };
    case BASKET_SAVE_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    case BASKET_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export const orderOptionsReducer = (
  state = { selectedOptions: [] },
  action
) => {
  switch (action.type) {
  }
};
