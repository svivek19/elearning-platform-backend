const User = require("../models/User.model");

const postData = async (req, res) => {
  try {
    // Your existing code to create a user
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

module.exports = { postData, getUser };
