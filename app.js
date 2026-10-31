require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const expressWinston = require("express-winston");

const router = require("./routes");
const logger = require("./utils/logger.js");
const { handleError } = require("./middlewares/errors.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  expressWinston.logger({
    winstonInstance: logger,
  }),
);

app.get("/", (req, res) => {
  res.send("News Explorer API is running!");
});

app.use("/", router);

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  }),
);

app.use(handleError);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
