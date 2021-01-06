import asyncHandler from "express-async-handler";
import Meal from "../models/mealModel.js";

//@desc Fetch All Meals
//@route GET /api/meals
//@access Public
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({});
  res.json(meals);
});

//@desc Fetch Single Meal
//@route GET /api/meals/:id
//@access Public
const getMealById = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (meal) {
    res.json(meal);
  } else {
    res.status(404);
    //throw new Error("Product not found");
  }
});

export { getMeals, getMealById };
