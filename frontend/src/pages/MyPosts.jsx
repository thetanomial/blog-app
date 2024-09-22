import React, { useEffect, useState } from 'react';
import { getMyPosts } from '../services/postsService';
import { Link } from 'react-router-dom'; // Import Link for navigation

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getMyPosts();
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="my-posts-container">
      <h2 className="my-posts-title">My Posts</h2>
      {posts.length === 0 ? (
        <p className="no-posts-message">You have no posts yet.</p>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post._id} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <div className="post-images">
                {post.images.map((image, index) => (
                  <img key={index} src={image} alt={`Post image ${index + 1}`} className="post-image" />
                ))}
              </div>
              <Link to={`/posts/${post._id}`} className="view-post-link">View Post</Link> {/* Link to view the post */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPosts;
