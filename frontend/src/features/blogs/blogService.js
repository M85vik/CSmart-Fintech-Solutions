import axios from 'axios';
const API_URL = 'http://localhost:5001/api/blogs/';

const getBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getBlog = async (blogId) => {
  const response = await axios.get(API_URL + blogId);
  return response.data;
};


// Create new blog
const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, blogData, config);
  return response.data;
};

// Update blog
const updateBlog = async (blogId, blogData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(API_URL + blogId, blogData, config);
    return response.data;
};

// Delete blog
const deleteBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + blogId, config);
  return response.data;
};

const blogService = { getBlogs, getBlog ,

   createBlog, // <-- EXPORT
  updateBlog, // <-- EXPORT
  deleteBlog, // <-- EXPORT
};
export default blogService;