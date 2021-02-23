import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMealDetails, updateMeal } from "../actions/mealActions";
import { MEAL_UPDATE_RESET } from "../constants/mealConstants";

const MealEditScreen = ({ match, history }) => {
  const mealId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const [options, setOptions] = useState([]);
  const [warningInfo, setWarningInfo] = useState([]);

  const dispatch = useDispatch();

  const mealDetails = useSelector((state) => state.mealDetails);
  const { loading, error, meal } = mealDetails;

  const mealUpdate = useSelector((state) => state.mealUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = mealUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MEAL_UPDATE_RESET });
      history.push("/admin/meallist");
    } else {
      if (!meal.name || meal._id !== mealId) {
        dispatch(listMealDetails(mealId));
      } else {
        setName(meal.name);
        setPrice(meal.price);
        setImage(meal.image);
        setCategory(meal.category);
        setCountInStock(meal.countInSock);
        setDescription(meal.description);
      }
    }
  }, [dispatch, history, mealId, meal, successUpdate]);

  return <div>Meal Edit</div>;
};

export default MealEditScreen;
