import React, { useState } from 'react';
import { addPost } from '../services/postsService.js';
import { toast } from 'react-toastify';
const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(null);
    const [isPublished, setIsPublished] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('isPublished', isPublished);
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        try {
            const newPost = await addPost(formData);
            toast.success('Post created successfully');
            // Handle success (e.g., show a success message, redirect, etc.)
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="add-post-container">
            <form className="add-post-form" onSubmit={handleSubmit}>
                <h2 className="add-post-title">Add Post</h2>
                <div className="add-post-group">
                    <input 
                        type="text" 
                        className="add-post-input" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="add-post-group">
                    <textarea 
                        className="add-post-textarea" 
                        placeholder="Content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    />
                </div>
                <div className="add-post-group">
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => setImages(e.target.files)} 
                    />
                </div>
                <div className="add-post-group">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={isPublished} 
                            onChange={(e) => setIsPublished(e.target.checked)} 
                        />
                        Publish
                    </label>
                </div>
                <button type="submit" className="add-post-button">Submit</button>
            </form>
        </div>
    );
};

export default AddPost;
