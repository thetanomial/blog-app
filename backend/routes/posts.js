import express from 'express'
import Post from '../models/Post.js'
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { uploadFiles } from '../firebase/uploadFiles.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Create a new post
router.post('/', upload.array('images', 5), asyncWrapper(async (req, res) => {
  const { title, content } = req.body;
  const files = req.files;

  // Upload the images and get the image URLs
  const imageLinks = await uploadFiles(files);

  // Create a new post instance with the uploaded image URLs
  const post = new Post({
    title,
    content,
    images: imageLinks, // Save the image URLs in the "images" field
  });

  await post.save();
  res.status(201).json(post);
}));

// Update an existing post
router.put('/posts/:id', asyncWrapper(async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }));

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete multiple posts
router.delete('/posts', async (req, res) => {
  try {
    const ids = req.body.ids; // Expecting an array of IDs in the request body
    const result = await Post.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${result.deletedCount} posts deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router
