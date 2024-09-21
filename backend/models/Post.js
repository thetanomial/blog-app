import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  images: {
    type: [String], 
    default: [],
  },
  content: {
    type: String,
    required: true,
    trim: true, 
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post
