import axios from 'axios';
import store from '../store.js'; // Import the Redux store

const API = axios.create({ baseURL: 'http://localhost:5000' });

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

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);