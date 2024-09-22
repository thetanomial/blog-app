import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/postsService';

const SinglePost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id); // Fetch the post by ID
        setPost(fetchedPost);
      } catch (error) {
        setError('Error fetching post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>; // Show the error message if there's an error

  return (
    <div className="single-post-container">
      <h2 className="single-post-title">{post.title}</h2>
      <p className="single-post-content">{post.content}</p>
      <div className="single-post-images">
        {post.images.map((image, index) => (
          <img key={index} src={image} alt={`Post image ${index + 1}`} className="single-post-image" />
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
