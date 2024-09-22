import axiosInstance from '../axios.js'; // Adjust the path as needed

// Function to add a new post
export const addPost = async (postData) => {
    try {
        const response = await axiosInstance.post('/posts', postData);
        return response.data; // Return the created post
    } catch (error) {
        console.error("Error adding post:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const getMyPosts = async () => {
    try {
        const response = await axiosInstance.get('/posts/my-posts');
        return response.data; // Return the array of posts with signed URLs
    } catch (error) {
        console.error("Error fetching my posts:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const getPostById = async (id) => {
    try {
      const response = await axiosInstance.get(`/posts/posts/${id}`);
      console.log(response.data)
      return response.data; // Return the fetched post
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error; // Rethrow the error for handling in the component
    }
  };
