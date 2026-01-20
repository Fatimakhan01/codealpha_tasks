import { useState } from "react";
import PostCard from "../components/PostCard";

const UserPosts = ({ posts, currentUserId }) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">User Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} currentUserId={currentUserId} />
        ))
      )}
    </div>
  );
};

export default UserPosts;
