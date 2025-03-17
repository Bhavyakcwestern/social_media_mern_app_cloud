import React from "react";
import { Grid } from "@mui/material";
import AuthPage from "../pages/AuthPage";
import authImage from "../images/authImage.jpg"; // Assuming you have this image in your images folder

const AuthLayout = () => {
    return (
        <Grid container style={{ height: "100vh" }}>
            <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={authImage} alt="Auth" style={{ width: "80%" }} />
            </Grid>
            <Grid item xs={6}>
                <AuthPage />
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
