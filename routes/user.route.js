const express = require("express");
const userRouter = express.Router();
const { postData, getUser, login } = require("../controllers/user.controller");

userRouter.post("/create", postData);
userRouter.get("/get", getUser);
userRouter.post("/login", login);

module.exports = userRouter;
