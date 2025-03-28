import axios from 'axios';
import store from '../store.js';

const API = axios.create({ baseURL: 'http://34.58.249.110' });

API.interceptors.request.use((req) => {
  const state = store.getState();
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