const express = require("express");
const userRouter = express.Router();
const { postData, getUser } = require("../controllers/user.controller");

userRouter.post("/create", postData);
userRouter.get("/get", getUser);

module.exports = userRouter;
