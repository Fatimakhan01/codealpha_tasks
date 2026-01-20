import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login first");

    const res = await axios.post(
      "http://localhost:5000/api/posts",
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setPosts([res.data, ...posts]);
    setContent("");
  };

  const likePost = async (id) => {
    const res = await axios.put(
      `http://localhost:5000/api/posts/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setPosts(posts.map((p) => (p._id === id ? res.data : p)));
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form onSubmit={createPost} className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
          Post
        </button>
      </form>

      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded mb-4">
          <p className="font-bold">{post.user.name}</p>
          <p>{post.content}</p>

          <button
            onClick={() => likePost(post._id)}
            className="text-sm text-blue-600 mt-2"
          >
            ❤️ {post.likes.length} Likes
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
