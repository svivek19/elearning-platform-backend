const express = require("express");
const userRouter = express.Router();
const {
  postData,
  getUser,
  login,
  updateUserStatus,
  updateCourse,
  deleteUser,
} = require("../controllers/user.controller");

userRouter.post("/create", postData);
userRouter.get("/get", getUser);
userRouter.post("/login", login);
userRouter.patch("/update/:userID", updateUserStatus);
userRouter.patch("/update-course/:userID", updateCourse);
userRouter.delete("/delete/:userID", deleteUser);

module.exports = userRouter;
