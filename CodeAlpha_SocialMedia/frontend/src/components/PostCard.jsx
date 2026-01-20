import { useState } from "react";
import axios from "axios";

const PostCard = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const token = localStorage.getItem("token");

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/comment",
        {
          postId: post._id,
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments(res.data.comments);
      setCommentText("");
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg mb-4">
      <p className="font-semibold">{post.user?.name}</p>
      <p>{post.content}</p>

      <div className="mt-3">
        {comments.map((c, index) => (
          <p key={index} className="text-sm">
            <b>{c.user?.name}:</b> {c.text}
          </p>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="border px-2 py-1 w-full rounded"
        />
        <button
          onClick={handleComment}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
