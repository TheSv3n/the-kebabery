import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_FAIL,
  MEAL_LIST_SUCCESS,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_FAIL,
  MEAL_DETAILS_SUCCESS,
  MEAL_DELETE_REQUEST,
  MEAL_DELETE_SUCCESS,
  MEAL_DELETE_FAIL,
  MEAL_CREATE_REQUEST,
  MEAL_CREATE_SUCCESS,
  MEAL_CREATE_FAIL,
  MEAL_UPDATE_REQUEST,
  MEAL_UPDATE_SUCCESS,
  MEAL_UPDATE_FAIL,
} from "../constants/mealConstants";
import {
  calculateOptionCost,
  setDefaultOptions,
} from "../actions/basketActions";
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
        selection: data.options[i].selections[0].name,
        price: data.options[i].selections[0].price,
      };
      defaultOptions.push(currentOption);
    }
    dispatch(setDefaultOptions(defaultOptions));
    dispatch(calculateOptionCost());
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

export const deleteMeal = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/meals/${id}`, config);

    dispatch({
      type: MEAL_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MEAL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createMeal = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/meals/`, {}, config);

    dispatch({
      type: MEAL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMeal = (meal) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/meal/${meal._id}`, meal, config);

    dispatch({
      type: MEAL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
