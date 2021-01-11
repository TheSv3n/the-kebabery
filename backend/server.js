import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import mealRoutes from "./routes/mealRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.use(notFound);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
