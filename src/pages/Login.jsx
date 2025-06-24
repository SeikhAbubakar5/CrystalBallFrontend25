import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import API_BASE_URL from "../api/utils"

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" })

  const handleInputUpdate =(e) => {
    const { name, value } = e.target;
    setFormData((prev)=>({...prev, [name]: value }))
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData)

    if (response.status === 200) {
      toast.success("Login successful");

      const { token, user } =response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user))
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Invalid credentials");
  }
};

  

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" sx={{ textTransform: "uppercase" }} padding={3} textAlign="center">
            Login
          </Typography>

          <TextField
            placeholder="Username"
            value={formData.username}
            onChange={handleInputUpdate}
            name="username"
            margin="normal"
            type="text"
            fullWidth
            required
          />

          <TextField
            placeholder="Password"
            value={formData.password}
            onChange={handleInputUpdate}
            name="password"
            margin="normal"
            type="password"
            fullWidth
            required
          />

          <Button type="submit" fullWidth sx={{ marginTop: 3 ,textTransform: "none" }} variant="contained" color="primary">
            Login
          </Button>

          <Button onClick={() => navigate("/register")} sx={{ borderRadius: 3, marginTop: 3 }}>
            Not Registered? Sign Up
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;