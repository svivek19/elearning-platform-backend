const Course = require("../models/course.model");

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { courseName, type, duration, description, link } = req.body;

    // Generate the course ID
    const latestCourse = await Course.findOne().sort({ _id: -1 });
    let courseNumber = 1;

    if (latestCourse && latestCourse.courseID) {
      const lastNumber = parseInt(latestCourse.courseID.split("-")[1], 10);
      courseNumber = lastNumber + 1;
    }

    const courseId = `VBCOURSE-${courseNumber.toString().padStart(3, "0")}`;

    const course = new Course({
      courseID: courseId,
      courseName,
      type,
      duration,
      description,
      link,
    });

    await course.save();

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
};

// get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ message: "All Courses", data: courses });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get course count
const getCourseContent = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ message: "All Courses", count: courses.length });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createCourse, getAllCourses, getCourseContent };
