const express = require("express");
const courseRouter = express.Router();
const {
  createCourse,
  getAllCourses,
} = require("../controllers/course.controller");

// POST request to create a new course
courseRouter.post("/new", createCourse);

// Get a list of courses
courseRouter.get("/get-all", getAllCourses);

module.exports = courseRouter;
