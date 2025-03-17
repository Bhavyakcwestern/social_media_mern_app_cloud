import { AUTH } from '../constants/actionTypes' ;
import * as api from '../api/index.js';

export const signin=(form,history)=>async (dispatch) =>{
    try {
        //log in user

        history.push('/');
    } catch (error) {
        console.log(error);
    }

};


export const signup=(form,history)=>async (dispatch) =>{
    try {
        //sign up user

        history.push('/');
    } catch (error) {
        console.log(error);
    }

};
