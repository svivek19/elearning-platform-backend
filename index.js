const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.route");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 5000;

// Routes
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
