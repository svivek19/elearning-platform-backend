const User = require("../models/User.model");

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

module.exports = { postData, getUser, login };
