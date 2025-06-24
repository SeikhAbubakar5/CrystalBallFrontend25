import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Grid,
} from "@mui/material";
import axios from "axios";
import API_BASE_URL from "../api/utils"
import toast from "react-hot-toast";

const AssetList =({ filters }) => {
    const [assets, setAssets] =useState([]);
    const [loading, setLoading] =useState(false)

    const user = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token");

    const fetchAssets = async () => {
        setLoading(true);
        try {
            let url = `${API_BASE_URL}/dashboard`;
            const query = [];

            if (user.role === "Base Commander") {
                query.push(`base=${user.base}`);
            } else {
                if (filters.base) query.push(`base=${filters.base}`);
            }

            if (filters.type) query.push(`type=${filters.type}`);
            if (filters.startDate) query.push(`startDate=${filters.startDate}`);
            if (filters.endDate) query.push(`endDate=${filters.endDate}`);

            if (user.role === "Logistics Officer") {
                toast.error("You are not allowed to view assets.");
                setAssets([]);
                setLoading(false);
                return;
            }

            if (query.length > 0) {
                url += "?" + query.join("&");
            }

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAssets(res.data.assets || []);
        } catch (err) {
            toast.error("Failed to fetch assets")
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, [filters]);

    return (
        <Box px={3} mt={2}>
            <Typography variant="h6" gutterBottom>
                All Assets
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : assets.length > 0 ? (
                <Grid container spacing={3} justifyContent="center">
                    {assets.map((asset) => (
                        <Grid
                            item
                            xs={12}
                            sm={4}        
                            md={3}        
                            key={asset._id}
                            display="flex"
                            justifyContent="center"
                        >
                            <Card
                                sx={{
                                    width: "250px",
                                    height: "300px",
                                    backgroundColor: "#f5f5ff",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    boxShadow: 4,
                                    borderRadius: 3,
                                    padding: 2,
                                }}
                            >
                                <CardContent sx={{ display:"flex", gap:"10px", flexDirection:"column"}}>
                                    <Typography
                                        variant="h6"
                                        sx={{ color: "blue", fontWeight: "bold", textAlign: "center" }}
                                    >
                                        {asset.name}
                                    </Typography>
                                    <Typography>Type:- {asset.type}</Typography>
                                    <Typography>Base:- {asset.base}</Typography>
                                    <Typography>Opening:- {asset.openingBalance}</Typography>
                                    <Typography>Closing:- {asset.closingBalance || 0}</Typography>
                                    <Typography>Assigned:- {asset.assigned || 0}</Typography>
                                    <Typography>Expended:- {asset.expended || 0}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            ) : (
                <Typography>No assets found or not authorized.</Typography>
            )}
        </Box>
    );
};

export default AssetList;
