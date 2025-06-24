import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Navbar from "../components/Navbar"
import ModalForm from "../components/Modal"
import AllAssets from "./AllAssets"

const typeOptions = ["Weapon", "Vehicle", "Ammunition"];
const baseOptions = ["Base1", "Base2", "Base3"];

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [openModal, setOpenModal] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    base: "",
    openingBalance: "",
    assetId: "",
    quantity: "",
    fromBase: "",
    toBase: "",
    date: "",
    personnel: "",
    expended: false,
  });

  const [filters, setFilters] = useState({
    base: "",
    type: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      
      <Box display="flex" justifyContent="center" gap={2} p={3} flexWrap="wrap">
        <Button variant="contained" color="primary" onClick={() =>setOpenModal("asset")}>
          Create Asset
        </Button>
        <Button variant="contained" color="secondary" onClick={()=> setOpenModal("purchase")}>
          Create Purchase
        </Button>
        <Button variant="contained" color="success" onClick={()=> setOpenModal("transfer")}>
          Create Transfer
        </Button>
        <Button variant="contained" color="warning" onClick={() =>setOpenModal("assignment")}>
          Assign Asset
        </Button>
      </Box>

      {/* filters */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" alignItems="center" gap={2} px={3} pb={3}>
        <TextField
          select
          label="Base"
          name="base"
          value={filters.base}
          onChange={handleFilterChange}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All Bases</MenuItem>
          {baseOptions.map((base) => (
            <MenuItem key={base} value={base}>{base}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Type"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {typeOptions.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          size="small"
        />

        <TextField
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          size="small"
        />
      </Box>

      {/*modal Form*/}
      <ModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        formData={formData}
        setFormData={setFormData}
        token={token}
      />
      <AllAssets filters={filters} />
    </>
  );
};

export default Dashboard;
