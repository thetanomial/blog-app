import React, { useState } from 'react';
import { addPost } from '../services/postsService.js';
import { toast } from 'react-toastify';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(null);
    const [isPublished, setIsPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting to true

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

            // Reset the form fields
            setTitle('');
            setContent('');
            setImages(null);
            setIsPublished(false);
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Error creating post. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset submitting to false
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
                <button 
                    type="submit" 
                    className="add-post-button" 
                    disabled={isSubmitting} // Disable the button if submitting
                >
                    {isSubmitting ? 'Hold on a second, submitting...' : 'Submit'} {/* Button text based on submitting state */}
                </button>
            </form>
        </div>
    );
};

export default AddPost;
