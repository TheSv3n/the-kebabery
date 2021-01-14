import { MENU_ACTIVE_TOGGLE } from "../constants/landingConsants";

export const toggleMenuActive = (currentState) => (dispatch, getState) => {
  dispatch({
    type: MENU_ACTIVE_TOGGLE,
    payload: currentState,
  });
};
