import express from 'express'
import Post from '../models/Post.js'
import asyncWrapper from '../middlewares/asyncWrapper.js';


const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
router.get('/posts', async (req, res) => {
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
