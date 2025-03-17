import axios from "axios";
import { AUTH } from "../constants/actionTypes";

// Signin Action
export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/signin", {
            identifier: formData.email || formData.username, // Can be username or email
            password: formData.password,
        });
        dispatch({ type: AUTH, payload: data });
        localStorage.setItem("profile", JSON.stringify(data));
        navigate("/dashboard"); // Redirect after successful signin
    } catch (error) {
        console.log("Signin Error:", error.response?.data || error.message);
    }
};

// Signup Action
export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/signup", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });
        dispatch({ type: AUTH, payload: data });
        localStorage.setItem("profile", JSON.stringify(data));
        navigate("/dashboard"); // Redirect after successful signup
    } catch (error) {
        console.log("Signup Error:", error.response?.data || error.message);
    }
};
