import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlog, reset } from '../features/blogs/blogSlice';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import Spinner from '../components/shared/Spinner';

function BlogDetails() {
  // 1. Get the blog ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();

  // 2. Get the relevant state from the Redux store
  const { blog, isLoading, isError, message } = useSelector(
    (state) => state.blogs
  );

  // 3. Fetch the blog data when the component mounts or the ID changes
  useEffect(() => {
    dispatch(getBlog(id));

    // 4. Cleanup function: Reset the blog state when the component unmounts
    // This is crucial to prevent showing old data on the next visit.
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  // 5. Handle the loading state
  if (isLoading) {
    return <Spinner />;
  }

  // 6. Handle the error state (e.g., blog not found)
  if (isError) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl text-red-500 mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link to="/blogs" className="bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
          Back to Blogs
        </Link>
      </div>
    );
  }

  // Helper function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 7. Render the blog post details
  return (
    <>
      <Helmet>
        {/* Dynamic SEO tags for this specific blog post */}
        <title>{`${blog?.title || 'Blog Post'} | Verity Finance Fintech`}</title>
        <meta 
          name="description" 
          content={blog?.content ? blog.content.substring(0, 155) : 'Read this insightful article from Verity Finance Fintech.'}
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Go Back Link */}
          <Link 
            to="/blogs" 
            className="inline-flex items-center space-x-2 text-primary hover:underline mb-8 font-medium"
          >
            <FaArrowLeft />
            <span>Back to All Articles</span>
          </Link>

          {/* Blog Header */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
            {blog.title}
          </h1>

          {/* Metadata: Date */}
          {blog.createdAt && (
            <div className="flex items-center space-x-2 text-gray-500 mb-8">
              <FaCalendarAlt />
              <span>Published on {formatDate(blog.createdAt)}</span>
            </div>
          )}
          
          {/* Blog Image */}
          {blog.imageUrl && (
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
            />
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default BlogDetails;