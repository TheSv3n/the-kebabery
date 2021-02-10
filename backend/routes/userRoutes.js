import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/profile").get(protect, getUserProfile);

router.post("/login", authUser);

export default router;
