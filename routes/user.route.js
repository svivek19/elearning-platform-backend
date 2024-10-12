const express = require("express");
const userRouter = express.Router();
const {
  postData,
  getUser,
  login,
  updateUserStatus,
} = require("../controllers/user.controller");

userRouter.post("/create", postData);
userRouter.get("/get", getUser);
userRouter.post("/login", login);
userRouter.patch("/update/:userID", updateUserStatus);

module.exports = userRouter;
