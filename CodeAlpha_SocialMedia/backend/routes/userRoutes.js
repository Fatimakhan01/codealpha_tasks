const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getUserProfile,
  followUser,
  addComment,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:id", protect, getUserProfile);

router.put("/:id/follow", protect, followUser);

router.post("/comment", protect, addComment);


module.exports = router;
