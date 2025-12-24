// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getBlogs, reset } from '../features/blogs/blogSlice';
// import Spinner from '../components/shared/Spinner';
// import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { motion } from 'framer-motion';

// function Blogs() {
//   const dispatch = useDispatch();
//   const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

//   useEffect(() => {
//     dispatch(getBlogs());
//     return () => {
//       dispatch(reset());
//     };
//   }, [dispatch]);

//   if (isLoading) return <Spinner />;

//   return (
//     <>
//       <Helmet>
//         <title>Blog | Verity Finance Fintech</title>
//         <meta name="description" content="Read the latest articles and insights from Verity Finance on finance, loans, and insurance." />
//       </Helmet>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <h1 className="text-4xl font-bold text-center mb-12">Our Latest Insights</h1>
//         {isError && <p className="text-center text-red-500">{message}</p>}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog, index) => (
//             <motion.div
//               key={blog._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Link to={`/blogs/${blog._id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
//                 {blog.imageUrl && (
//                   <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
//                 )}
//                 <div className="p-6">
//                   <h2 className="text-xl font-bold mb-2 text-dark">{blog.title}</h2>
//                   <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
//                   <span className="font-semibold text-primary hover:underline">Read More &rarr;</span>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Blogs;

// // File: src/pages/Blogs.jsx
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getBlogs, reset } from '../features/blogs/blogSlice';
// import Spinner from '../components/shared/Spinner';
// import { Helmet } from 'react-helmet-async';
// import BlogCarousel from '../components/blogs/BlogCarousel';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// export default function Blogs() {
//   const dispatch = useDispatch();
//   const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

//   useEffect(() => {
//     dispatch(getBlogs());
//     return () => {
//       dispatch(reset());
//     };
//   }, [dispatch]);

//   // Separate blogs for the carousel and the grid
//   const featuredBlogs = blogs.slice(0, 5);
//   const olderBlogs = blogs.slice(5);

//   return (
//     <>
//       <Helmet>
//         <title>Blog | Verity Finance Pedia</title>
//         <meta name="description" content="Read the latest articles and insights from Verity Finance on finance, loans, and insurance." />
//       </Helmet>

//       {/* Hero/Carousel Section */}
//       <div className="bg-brand-bg py-16 sm:py-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

//             <motion.div 
//                 className="lg:col-span-1 text-center lg:text-left"
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.7 }}
//             >
//               <h1 className="text-4xl sm:text-6xl font-extrabold text-dark tracking-tight">
//                 Verity Finance-Pedia
//               </h1>
//               <p className="mt-4 text-xl text-gray-600">
//                 Simplifying Finance For Everyone.
//               </p>
//               <Link to="/contact">
//                 <motion.button 
//                     className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-secondary transition-colors shadow-lg"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     Get in Touch
//                 </motion.button>
//               </Link>
//             </motion.div>

//             <motion.div 
//                 className="lg:col-span-2"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.7 }}
//             >
//               {isLoading && <div className="h-[350px] flex items-center justify-center"><Spinner /></div>}
//               {isError && <div className="h-[350px] flex items-center justify-center text-red-500">{message}</div>}
//               {!isLoading && !isError && <BlogCarousel blogs={featuredBlogs} />}
//             </motion.div>

//           </div>
//         </div>
//       </div>

//       {/* "All Articles" Grid Section */}
//       {olderBlogs.length > 0 && (
//         <div className="bg-white py-16 sm:py-20">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-3xl font-bold text-center mb-12 text-dark">All Articles</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {olderBlogs.map((blog, index) => (
//                     <motion.div
//                         key={blog._id}
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true, amount: 0.3 }}
//                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                     >
//                         <Link to={`/blogs/${blog._id}`} className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full group">
//                             {blog.imageUrl ? (
//                                 <div className="overflow-hidden h-48">
//                                     <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//                                 </div>
//                             ) : (
//                                 <div className="h-48 bg-gray-200" />
//                             )}
//                             <div className="p-6">
//                                 <h3 className="text-xl font-bold mb-2 text-dark h-14 line-clamp-2">{blog.title}</h3>
//                                 <p className="text-gray-600 mb-4 h-20 line-clamp-3">{blog.content}</p>
//                                 <span className="font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">Read More &rarr;</span>
//                             </div>
//                         </Link>
//                     </motion.div>
//                 ))}
//                 </div>
//             </div>
//         </div>
//       )}
//     </>
//   );
// }



// // File: src/pages/Blogs.jsx
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getBlogs, reset } from '../features/blogs/blogSlice';
// import Spinner from '../components/shared/Spinner';
// import { Helmet } from 'react-helmet-async';
// import BlogCarousel from '../components/blogs/BlogCarousel';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// function Blogs() { // Changed from 'export default function' to a regular function
//   const dispatch = useDispatch();
//   const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

//   useEffect(() => {
//     dispatch(getBlogs());
//     return () => {
//       dispatch(reset());
//     };
//   }, [dispatch]);

//   // --- FIX #2: ROBUST SLICING LOGIC ---
//   // The carousel will show up to 5 of the latest posts.
//   const featuredBlogs = blogs.slice(0, 5); 
//   // The grid will show ALL posts, including the featured ones. This is a common and better UX.
//   const allBlogsForGrid = blogs;

//   return (
//     <>
//       <Helmet>
//         <title>Blog | Verity Finance Pedia</title>
//         <meta name="description" content="Read the latest articles and insights from Verity Finance on finance, loans, and insurance." />
//       </Helmet>

//       {/* Hero/Carousel Section */}
//       <div className="bg-brand-bg py-16 sm:py-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

//             <motion.div 
//                 className="lg:col-span-1 text-center lg:text-left"
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.7 }}
//             >
//               <h1 className="text-4xl sm:text-6xl font-extrabold text-dark tracking-tight">
//                 Verity Finance-Pedia
//               </h1>
//               <p className="mt-4 text-xl text-gray-600">
//                 Simplifying Finance For Everyone.
//               </p>
//               <Link to="/contact">
//                 <motion.button 
//                     className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-secondary transition-colors shadow-lg"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     Get in Touch
//                 </motion.button>
//               </Link>
//             </motion.div>

//             <motion.div 
//                 className="lg:col-span-2"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.7 }}
//             >
//               {isLoading && <div className="h-[350px] flex items-center justify-center"><Spinner /></div>}
//               {isError && <div className="h-[350px] flex items-center justify-center text-red-500">{message}</div>}
//               {!isLoading && !isError && <BlogCarousel blogs={featuredBlogs} />}
//             </motion.div>

//           </div>
//         </div>
//       </div>

//       {/* "All Articles" Grid Section */}
//       {!isLoading && allBlogsForGrid.length > 0 && (
//         <div className="bg-white py-16 sm:py-20">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-3xl font-bold text-center mb-12 text-dark">All Articles</h2>
//                 {isError && <p className="text-center text-red-500">{message}</p>}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {allBlogsForGrid.map((blog, index) => (
//                     <motion.div
//                         key={blog._id}
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true, amount: 0.3 }}
//                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                     >
//                         <Link to={`/blogs/${blog._id}`} className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full group">
//                             {blog.imageUrl ? (
//                                 <div className="overflow-hidden h-48">
//                                     <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
//                                 </div>
//                             ) : (
//                                 <div className="h-48 bg-gray-200" />
//                             )}
//                             <div className="p-6 flex flex-col">
//                                 <h3 className="text-xl font-bold mb-2 text-dark h-14 line-clamp-2">{blog.title}</h3>
//                                 <p className="text-gray-600 mb-4 h-20 line-clamp-3 flex-grow">{blog.content}</p>
//                                 <span className="font-semibold text-brand-primary group-hover:text-brand-accent transition-colors mt-auto">Read More &rarr;</span>
//                             </div>
//                         </Link>
//                     </motion.div>
//                 ))}
//                 </div>
//             </div>
//         </div>
//       )}
//     </>
//   );
// }

// // --- FIX #1: ADD THE MISSING DEFAULT EXPORT ---
// export default Blogs;


// File: src/pages/Blogs.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs, reset } from '../features/blogs/blogSlice';
import Spinner from '../components/shared/Spinner';
import { Helmet } from 'react-helmet-async';
import BlogCarousel from '../components/blogs/BlogCarousel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function Blogs() {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  const featuredBlogs = blogs.slice(0, 5);
  const allBlogsForGrid = blogs;

  return (
    <>
      <Helmet>
        {/* ... */}
      </Helmet>

      {/* Hero/Carousel Section (Unchanged) */}

      <div className="bg-brand-bg py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

            <motion.div
              className="lg:col-span-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl sm:text-6xl font-extrabold text-dark tracking-tight">
                Verity Finance-Pedia
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Simplifying Finance For Everyone.
              </p>
              <Link to="/contact">
                <motion.button
                  className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-secondary transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {isLoading && <div className="h-[350px] flex items-center justify-center"><Spinner /></div>}
              {isError && <div className="h-[350px] flex items-center justify-center text-red-500">{message}</div>}
              {!isLoading && !isError && <BlogCarousel blogs={featuredBlogs} />}
            </motion.div>

          </div>
        </div>
      </div>


      {/* "ALL ARTICLES" GRID SECTION WITH NEW CARD DESIGN */}
      {!isLoading && allBlogsForGrid.length > 0 && (
        <div className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-dark">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allBlogsForGrid.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1, y: { type: 'spring', stiffness: 100 } }}
                >
                  <Link to={`/blogs/${blog._id}`} className="block bg-white rounded-xl shadow-lg overflow-hidden h-full group">
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={blog.imageUrl || 'https://placehold.co/600x400/EEE/31343C?text=Verity Finance'}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    <div className="p-6 flex flex-col">
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>Personal Finance</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>

                      <h3 className="text-xl font-bold text-dark h-16 line-clamp-2">{blog.title}</h3>

                      <p className="text-gray-600 my-4 h-24 line-clamp-4 flex-grow">{blog.content}</p>

                      <div className="mt-auto flex items-center font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">
                        <span>Read More</span>
                        <div className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                          <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Blogs;