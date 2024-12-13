const express = require("express");
const userRouter = require("./user");

route = express.Router();

route.use("/user", userRouter);

module.exports = route;
