import { MENU_ACTIVE_TOGGLE } from "../constants/landingConsants";

export const menuActiveReducer = (state = { menuActive: false }, action) => {
  switch (action.type) {
    case MENU_ACTIVE_TOGGLE:
      let currentState = action.payload;
      currentState = !currentState;
      let active = "";
      if (currentState) {
        active = "active";
      } else {
        active = "";
      }

      return {
        ...state,
        menuActive: currentState,
        menuToggle: active,
      };
    default:
      return state;
  }
};
