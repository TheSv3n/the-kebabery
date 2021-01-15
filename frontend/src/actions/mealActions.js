import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_FAIL,
  MEAL_LIST_SUCCESS,
} from "../constants/mealConstants";
import axios from "axios";

export const listMeals = () => async (dispatch) => {
  try {
    dispatch({ type: MEAL_LIST_REQUEST });

    const { data } = await axios.get(`/api/meals`);
    dispatch({
      type: MEAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
