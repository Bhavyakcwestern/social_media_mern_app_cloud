import React, { useState } from "react";
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../actions/authActions";

const AuthPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate)); // Call signup with formData
        } else {
            dispatch(signin(formData, navigate)); // Call signin with formData
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: "10vh" }}>
                <Avatar style={{ backgroundColor: "#1976D2", margin: "auto" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" align="center" gutterBottom>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <TextField
                            name="username"
                            label="Username"
                            fullWidth
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    )}
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    {isSignup && (
                        <TextField
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    )}
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 10 }}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                </form>
                <Button onClick={() => setIsSignup(!isSignup)} fullWidth style={{ marginTop: 10 }}>
                    {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </Button>
            </Paper>
        </Container>
    );
};

export default AuthPage;
