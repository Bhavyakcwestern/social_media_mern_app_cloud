import axios from 'axios';
import store from '../store.js'; // Import the Redux store

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://35.192.132.239' });

 

 
API.interceptors.request.use((req) => {
  const state = store.getState(); // Get the current state from the Redux store
  const profile = state.auth.authData;
 
  if (profile) {
    req.headers.Authorization = `Bearer ${profile.token}`;
  }
 
  return req;
});
 
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchComments = (postId) => API.get(`/posts/${postId}/comments`);
export const addComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);
 
 
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);