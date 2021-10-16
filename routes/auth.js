const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// // REGISTER USER
router.post("/register", async (req, res) => {
  try {
    // GENERATE NEW PASSWORD
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //     // CREATE NEW USER
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //     // ADD USER
    user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// // LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("User not found!");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Password incorrect!");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
