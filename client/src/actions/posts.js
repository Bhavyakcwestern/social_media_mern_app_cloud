import * as api from '../api'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

export const getPost = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getComments = (postId) => async (dispatch) => {
    try {
        const { data } = await api.fetchComments(postId);
        dispatch({ type: 'FETCH_COMMENTS', payload: { postId, comments: data } });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};


export const addComment = (postId, content) => async (dispatch) => {
    try {
        const { data } = await api.addComment(postId, { content });
        dispatch({ type: 'ADD_COMMENT', payload: { postId, comment: data } });
    } catch (error) {
        console.log(error);
    }
};
