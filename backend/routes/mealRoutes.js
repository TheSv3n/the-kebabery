import express from "express";
const router = express.Router();
import {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
} from "../controllers/mealController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getMeals).post(protect, admin, createMeal);

router
  .route("/:id")
  .get(getMealById)
  .put(protect, admin, updateMeal)
  .delete(protect, admin, deleteMeal);

export default router;
