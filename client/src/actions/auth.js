import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (form, history) => async (dispatch) => {
    try {
        // Log in user
        const { data } = await api.signIn(form);

        dispatch({ type: AUTH, data });

        // Use the passed `history` to navigate
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (form, history) => async (dispatch) => {
    try {
        // Sign up user
        const { data } = await api.signUp(form);

        dispatch({ type: AUTH, data });

        // Use the passed `history` to navigate
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};
