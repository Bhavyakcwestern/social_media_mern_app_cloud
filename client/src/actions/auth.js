import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      dispatch({ type: AUTH, data });
      localStorage.setItem('profile', JSON.stringify(data)); // Save user to localStorage
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  export const signup = (formData, history) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      localStorage.setItem('profile', JSON.stringify(data)); // Save user to localStorage
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  