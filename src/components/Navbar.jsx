import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.username?.charAt(0)?.toUpperCase()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user");
    navigate("/login")
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "violet" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Military Asset Management System
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "white", color: "violet", fontWeight: "bold" }}>
            {firstLetter}
          </Avatar>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
