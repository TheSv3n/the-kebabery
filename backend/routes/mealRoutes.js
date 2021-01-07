import express from "express";
const router = express.Router();
import {
  getMeals,
  getMealById,
  createMeal,
} from "../controllers/mealController.js";

router.route("/").get(getMeals).post(createMeal); //needs middleware

router.route("/:id").get(getMealById);

export default router;
