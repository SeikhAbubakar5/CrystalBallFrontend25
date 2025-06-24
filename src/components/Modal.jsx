import React from "react";
import {
    TextField,
    MenuItem,
    Button,
    Typography,
    Box,
    Modal,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../api/utils"

const typeOptions = ["Weapon", "Vehicle", "Ammunition"]
const baseOptions = ["Base1", "Base2", "Base 3"]

const ModalForm = ({ openModal, setOpenModal, formData, setFormData, token }) => {
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (endpoint) => {
        try {
            const payload = { ...formData };
            if (["purchase", "transfer", "assignment"].some((key) => endpoint.includes(key))) {
                payload.quantity = parseInt(payload.quantity);
            }

            await axios.post(`${API_BASE_URL}${endpoint}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Action successful");
            setOpenModal(null);
        } catch (error) {
            toast.error("Action failed")
            console.error(error);
        }
    };

    const renderModalContent = () => {
        switch (openModal) {
            case "asset":
                return (
                    <>
                        <TextField
                            name="name"
                            label="Asset Name"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            select name="type"
                            label="Type"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}>
                            {typeOptions.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                        </TextField>

                        <TextField
                            select name="base"
                            label="Base"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}>
                            {baseOptions.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                        </TextField>

                        <TextField
                            name="openingBalance"
                            label="Opening Balance"
                            type="number"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange} />
                        <Button onClick={() => handleSubmit("/asset")} variant="contained" sx={{ mt: 2 }}>Submit</Button>
                    </>
                );

            case "purchase":
                return (
                    <>
                        <TextField
                            name="assetId"
                            label="Asset ID"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            argin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="date"
                            label="Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            select name="base"
                            label="Base"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}>
                            {baseOptions.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                        </TextField>

                        <Button onClick={() => handleSubmit("/purchase")} variant="contained" sx={{ mt: 2 }}>Submit</Button>
                    </>
                );

            case "transfer":
                return (
                    <>
                        <TextField
                            name="assetId"
                            label="Asset ID"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            ame="fromBase"
                            label="From Base"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="toBase"
                            label="To Base"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="date"
                            label="Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange} />
                        <Button onClick={() => handleSubmit("/transfer")} variant="contained" sx={{ mt: 2 }}>Submit</Button>
                    </>
                );
            case "assignment":
                return (
                    <>
                        <TextField
                            name="assetId"
                            label="Asset ID"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="personnel"
                            label="Personnel"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange} />
                        <TextField
                            name="date"
                            label="Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="base"
                            label="Base"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}
                        />
                        <TextField
                            select
                            name="expended"
                            label="Expended"
                            fullWidth
                            margin="normal"
                            onChange={handleInputChange}>
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                        </TextField>
                        <Button onClick={() => handleSubmit("/assignment")} variant="contained" sx={{ mt: 2 }}>Submit</Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal open={!!openModal} onClose={() => setOpenModal(null)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" mb={2} textAlign="center" textTransform="uppercase">
                    {openModal?.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </Typography>
                {renderModalContent()}
            </Box>
        </Modal>
    );
};

export default ModalForm;
