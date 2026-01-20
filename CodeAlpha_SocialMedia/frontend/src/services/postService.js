import API from "./api";

export const fetchPosts = async () => {
  const { data } = await API.get("/posts");
  return data;
};

export const createPost = async (postData) => {
  const { data } = await API.post("/posts", postData);
  return data;
};

export const likePost = async (postId) => {
  const { data } = await API.put(`/posts/${postId}/like`);
  return data;
};
