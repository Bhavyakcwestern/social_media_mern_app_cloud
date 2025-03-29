import axios from 'axios';
import store from '../store.js';

// Get API URL from environment variables with fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API = axios.create({ 
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor with error handling
API.interceptors.request.use(
  (req) => {
    const state = store.getState();
    const profile = state.auth.authData;

    if (profile?.token) {
      req.headers.Authorization = `Bearer ${profile.token}`;
    }
    return req;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchComments = (postId) => API.get(`/posts/${postId}/comments`);
export const addComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);