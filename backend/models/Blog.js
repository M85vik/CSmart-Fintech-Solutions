// File: models/Blog.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Can store HTML content from a rich text editor
  imageUrl: { type: String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);