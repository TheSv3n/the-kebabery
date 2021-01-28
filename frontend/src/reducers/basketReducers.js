import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SAVE_DELIVERY_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
  BASKET_OPTIONS_SET,
  BASKET_OPTIONS_UPDATE,
  BASKET_OPTIONS_RESET,
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

export const mealOptionsReducer = (state = { selectedOptions: [] }, action) => {
  switch (action.type) {
    case BASKET_OPTIONS_SET:
      return {
        ...state,
        selectedOptions: action.payload,
      };
    case BASKET_OPTIONS_UPDATE:
      const option = action.payload;
      let tempOptions = state.selectedOptions;
      tempOptions = tempOptions.filter((x) => x.id !== option.id);
      tempOptions = [...tempOptions, option];
      return {
        ...state,
        selectedOptions: tempOptions,
      };
    case BASKET_OPTIONS_RESET:
      return {
        ...state,
        selectedOptions: [],
      };
    default:
      return state;
  }
};
