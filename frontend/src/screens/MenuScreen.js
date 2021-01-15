import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listMeals } from "../actions/mealActions";

const MenuScreen = () => {
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals } = mealList;

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  return <div>Menu</div>;
};

export default MenuScreen;
