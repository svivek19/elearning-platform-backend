const express = require("express");
const userRouter = express.Router();
const {
  postData,
  getUser,
  login,
  updateUserStatus,
  updateCourse,
  deleteUser,
  adminLogin,
} = require("../controllers/user.controller");

userRouter.post("/create", postData);
userRouter.get("/get", getUser);
userRouter.post("/login", login);
userRouter.patch("/update/:userID", updateUserStatus);
userRouter.patch("/update-course/:userID", updateCourse);
userRouter.delete("/delete/:userID", deleteUser);
userRouter.post("/admin-login/", adminLogin);

module.exports = userRouter;
