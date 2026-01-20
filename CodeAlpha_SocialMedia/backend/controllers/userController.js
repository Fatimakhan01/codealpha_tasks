const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Get user profile + posts
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "_id name")
      .populate("following", "_id name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ user: userId })
      .populate("comments")
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow || !currentUser)
      return res.status(404).json({ message: "User not found" });

    const isFollowing = userToFollow.followers.includes(req.user.id);

    if (isFollowing) {
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== req.user.id
      );
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== req.params.id
      );
    } else {
      userToFollow.followers.push(req.user.id);
      currentUser.following.push(req.params.id);
    }

    await userToFollow.save();
    await currentUser.save();

    res.json({ user: userToFollow, currentUser });
  } catch (error) {
    console.error("FOLLOW ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    if (!content) return res.status(400).json({ message: "Comment cannot be empty" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      user: req.user.id,
      post: postId,
      content,
    });

    post.comments.push(comment._id);
    await post.save();

    const populatedComment = await comment.populate("user", "name");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("COMMENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
