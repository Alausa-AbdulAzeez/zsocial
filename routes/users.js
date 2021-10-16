const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// // UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      await res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).send("Access denied!!!");
  }
});
// // DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      await res.status(200).json("Account has been deleted successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).send("Access denied!!! Can only delete your account");
  }
});
// GET FOLLOWINGS
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendsList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // GET USER
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json(`now following`);
      } else {
        res.status(403).json(`You're already folloing this user`);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json(`Can't follow yourself dummy`);
  }
});

// // UNFOLLOW A USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json(`successfully unfollowed`);
      } else {
        res.status(403).json(`You're not following this user`);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json(`Can't unfollow yourself dummy`);
  }
});

module.exports = router;
