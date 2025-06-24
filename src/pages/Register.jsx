import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../api/utils"

const roles = ["Admin", "Base Commander", "Logistics Officer"];

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.role) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={500}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={4}
          boxShadow="10px 10px 20px #ccc"
          borderRadius={5}
        >
          <Typography variant="h4" textAlign="center" textTransform="uppercase" marginBottom={3}>
            Register
          </Typography>

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputUpdate}
            margin="normal"
            type="text"
            fullWidth
            required
          />

          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputUpdate}
            margin="normal"
            type="password"
            fullWidth
            required
          />

          <TextField
            select
            label="Select Role"
            name="role"
            value={formData.role}
            onChange={handleInputUpdate}
            margin="normal"
            fullWidth
            required
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, borderRadius: 1 }}
          >
            Register
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="text"
            fullWidth
            sx={{ mt: 2, textTransform: "none" }}
          >
            Already have an account? Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
