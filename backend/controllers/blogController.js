// File: controllers/blogController.js
const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 }); // newest first
  res.json(blogs);
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private (Admin)
exports.createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const blog = new Blog({
    title,
    content,
    imageUrl,
    author: req.user.id,
  });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
exports.updateBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.imageUrl = imageUrl || blog.imageUrl;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
exports.deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};