import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import https from "https";
import connectDB from "./config/db.js";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import mealRoutes from "./routes/mealRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

let credentials = {};

//Certificate
if (process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/thesv3n.ddns.net/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/thesv3n.ddns.net/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/thesv3n.ddns.net/chain.pem",
    "utf8"
  );

  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
} else {
  credentials = {
    key: "",
    cert: "",
    ca: "",
  };
}

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

if (process.env.NODE_ENV === "production") {
  httpsServer.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    )
  );
} else {
  httpServer.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    )
  );
}
