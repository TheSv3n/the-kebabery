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
    throw new Error("Meal not found");
  }
});

//@desc Create a meal
//@route POST /api/meals
//@access Private/Admin
const createMeal = asyncHandler(async (req, res) => {
  const meal = new Meal({
    name: "Sample name",
    price: 0,
    image: "/images/sample.jpg",
    category: "Sample category",
    description: "Sample description",
    countInStock: 0,
  });

  const createdMeal = await meal.save();
  res.status(201).json(createdMeal);
});

//@desc Update a meal
//@route PUT /api/meals/:id
//@access Private/Admin
const updateMeal = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
    options,
    warningInfo,
  } = req.body;

  const meal = await Meal.findById(req.params.id);

  if (meal) {
    meal.name = name;
    meal.price = price;
    meal.description = description;
    meal.image = image;
    meal.category = category;
    meal.countInStock = countInStock;
    meal.options = options;
    meal.warningInfo = warningInfo;

    const updatedMeal = await meal.save();
    res.status(201).json(updatedMeal);
  } else {
    res.status(404);
    throw new Error("Meal not found");
  }
});

//@desc Delete a meal
//@route DELETE /api/meals/:id
//@access Private/Admin
const deleteMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (meal) {
    await meal.remove();
    res.json({ message: "Meal removed" });
  } else {
    res.status(404);
    throw new Error("Meal not found");
  }
});

export { getMeals, getMealById, createMeal, updateMeal, deleteMeal };
