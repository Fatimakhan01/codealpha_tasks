const express = require("express");
const {
  createPost,
  getPosts,
  likePost,
  addComment,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);

router.get("/", getPosts);

router.put("/:id/like", protect, likePost);

router.post("/:id/comment", protect, addComment);

module.exports = router;
