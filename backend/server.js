import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import mealRoutes from "./routes/mealRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use("/api/meals", mealRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
