import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserPosts from "./UserPosts";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${id}/follow`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user); 
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">User not found</p>
    );

  const isOwnProfile = loggedInUser && loggedInUser._id === user._id;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="bg-white shadow rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500 mt-1">{user.email}</p>

        <div className="flex justify-center gap-8 mt-4">
          <div>
            <p className="font-bold">{posts.length}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-bold">{user.followers?.length || 0}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-bold">{user.following?.length || 0}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>

        {!isOwnProfile && (
          <button
            onClick={handleFollow}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {user.followers?.some((f) => f._id === loggedInUser._id)
              ? "Unfollow"
              : "Follow"}
          </button>
        )}
      </div>

      <UserPosts posts={posts} currentUserId={loggedInUser?._id} />
    </div>
  );
};

export default Profile;
