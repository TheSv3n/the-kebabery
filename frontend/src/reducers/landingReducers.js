import { MENU_ACTIVE_TOGGLE } from "../constants/landingConsants";

export const menuToggleReducer = (
  state = { menuToggle: false, menuActive: "" },
  action
) => {
  switch (action.type) {
    case MENU_ACTIVE_TOGGLE:
      let stateActive = action.payload;

      let active = "";
      if (stateActive) {
        active = "active";
      } else {
        active = "";
      }

      return {
        ...state,
        menuToggle: stateActive,
        menuActive: active,
      };
    default:
      return state;
  }
};
