import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_FAIL,
  MEAL_LIST_SUCCESS,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_FAIL,
  MEAL_DETAILS_SUCCESS,
} from "../constants/mealConstants";
import { BASKET_OPTIONS_SET } from "../constants/basketConstants";
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

export const listMealDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/meals/${id}`);
    let defaultOptions = [];
    for (let i = 0; i < data.options.length; i++) {
      let currentOption = {
        id: data.options[i]._id,
        name: data.options[i].name,
        option: data.options[i].options[0].name,
        price: data.options[i].options[0].price,
      };
      defaultOptions.push(currentOption);
    }
    dispatch({
      type: BASKET_OPTIONS_SET,
      payload: defaultOptions,
    });
    dispatch({
      type: MEAL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
