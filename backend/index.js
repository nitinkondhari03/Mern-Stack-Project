const express = require("express");
const dotenv = require("dotenv");
const { connetDatabase } = require("./src/config/database");
const { userRouter } = require("./src/routers/userRoutes");

const app = express();

app.use(express.json());

dotenv.config({ path: "./.env" });

app.use("/", userRouter);

app.listen(8080, async () => {
  try {
    await connetDatabase();
    console.log("server run at port at 8080");
  } catch (error) {
    console.log(error);
  }
});
