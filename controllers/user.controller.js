const Course = require("../models/course.model.js");
const User = require("../models/user.model.js");

const postData = async (req, res) => {
  try {
    const lastUser = await User.findOne().sort({ userID: -1 }).exec();
    let newUserId;

    if (lastUser) {
      const lastIdNum = parseInt(lastUser.userID.slice(2), 10);
      const newIdNum = lastIdNum + 1;
      newUserId = `VB${String(newIdNum).padStart(4, "0")}`;
    } else {
      newUserId = "VB0001";
    }

    const newUser = await User.create({ userID: newUserId, ...req.body });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const response = await User.find({});
    return res
      .status(200)
      .json({ message: "User fetched successfully", response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  const { userID } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ["Not Enrolled", "Enrolled", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Find the course by courseID and update its status
    const updateUserStatus = await User.findOneAndUpdate(
      { userID },
      { status },
      { new: true, runValidators: true }
    );

    // If the course is not found, return a 404 response
    if (!updateUserStatus) {
      return res.status(404).json({ message: "user not found." });
    }

    // Return the updated course details
    res.status(200).json(updateUserStatus);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateCourse = async (req, res) => {
  const { userID } = req.params;
  const { enrolledCourse } = req.body;

  try {
    const updateUser = await User.findOneAndUpdate(
      { userID },
      { enrolledCourse },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const response = await User.find({});
    const user = response.find(
      (user) => user.email === email && user.phone === phone
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User logged in successfully", response: user });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = { postData, getUser, login, updateUserStatus, updateCourse };
