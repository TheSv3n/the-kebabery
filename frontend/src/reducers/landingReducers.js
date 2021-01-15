import { MENU_ACTIVE_TOGGLE } from "../constants/landingConsants";

export const menuToggleReducer = (
  state = { menuToggle: false, menuActive: "" },
  action
) => {
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
        menuToggle: currentState,
        menuActive: active,
      };
    default:
      return state;
  }
};
