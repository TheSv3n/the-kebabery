import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_UPDATE_DELIVERY_COST,
  BASKET_SAVE_DELIVERY_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
  BASKET_OPTIONS_SET,
  BASKET_OPTIONS_UPDATE,
  BASKET_OPTIONS_RESET,
  BASKET_OPTIONS_CALC_COST,
  BASKET_ITEMS_RESET,
} from "../constants/basketConstants";

export const basketReducer = (
  state = { basketItems: [], deliveryAddress: {}, deliveryCost: 0 },
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
    case BASKET_ITEMS_RESET:
      return {
        ...state,
        basketItems: [],
        deliveryCost: 0,
      };
    case BASKET_SAVE_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    case BASKET_UPDATE_DELIVERY_COST:
      return {
        ...state,
        deliveryCost: action.payload,
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

export const mealOptionsReducer = (
  state = { selectedOptions: [], optionsTotal: 0 },
  action
) => {
  switch (action.type) {
    case BASKET_OPTIONS_SET:
      return {
        ...state,
        selectedOptions: action.payload,
      };
    case BASKET_OPTIONS_UPDATE:
      const option = action.payload;
      let tempOptions = state.selectedOptions;
      let index = tempOptions.findIndex((i) => i.id === option.id);
      tempOptions[index] = option;
      return {
        ...state,
        selectedOptions: tempOptions,
      };
    case BASKET_OPTIONS_RESET:
      return {
        ...state,
        selectedOptions: [],
      };
    case BASKET_OPTIONS_CALC_COST:
      let newTotal = state.selectedOptions.reduce(
        (acc, item) => acc + item.price,
        0
      );
      return {
        ...state,
        optionsTotal: newTotal,
      };
    default:
      return state;
  }
};
