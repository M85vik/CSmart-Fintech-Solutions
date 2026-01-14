// File: src/pages/admin/BlogManager.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// --- THE FIX IS HERE ---
// We are now importing createBlog and deleteBlog from the correct blogSlice,
// and have removed the incorrect import of createBanner.
import { getBlogs, createBlog, deleteBlog, reset } from '../../features/blogs/blogSlice';
import { Helmet } from 'react-helmet-async';
import Spinner from '../../components/shared/Spinner';
import { FaPlus, FaTrash } from 'react-icons/fa';

function BlogManager() {
  const dispatch = useDispatch();
  // The useSelector is already correct, pointing to state.blogs
  const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  const { title, content, imageUrl } = formData;

  useEffect(() => {
    dispatch(getBlogs());
    // Note: We remove the 'reset' on cleanup to prevent the "spinner on return" bug.
  }, [dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please add a title and content');
    } else {
      // This will now correctly dispatch the createBlog action
      dispatch(createBlog({ title, content, imageUrl }));
      setFormData({ title: '', content: '', imageUrl: '' });
    }
  };

  if (isLoading && !blogs) { // More robust loading check
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Blog Manager | CS Smart Finserv Admin</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Manager</h1>
        </div>

        {/* Create Blog Form (JSX is correct) */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FaPlus className="mr-3 text-primary" /> Create New Blog Post
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
              <input type="text" name="title" id="title" value={title} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">Image URL (Optional)</label>
              <input type="text" name="imageUrl" id="imageUrl" value={imageUrl} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
              <textarea name="content" id="content" rows="8" value={content} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg" required></textarea>
            </div>
            <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Publish Post
            </button>
          </form>
        </div>

        {/* Existing Blogs Table (JSX is correct) */}
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Existing Posts</h2>
            {isError && <p className="text-red-500">{message}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {blogs && blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                                <td className="px-6 py-4 whitespace-nowrad text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => dispatch(deleteBlog(blog._id))} className="text-red-600 hover:text-red-900">
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </>
  );
}

export default BlogManager;