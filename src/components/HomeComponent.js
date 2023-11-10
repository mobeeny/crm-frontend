//This is a Sample Redux Component
import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { Box } from "@mui/material";

function HomeComponent() {
    return (
        <>
            <Layout />
            <Box sx={{ display: "flex", marginLeft: 8, marginTop: 8 }}>
                <Outlet />
            </Box>
        </>
    );
}

export default HomeComponent;
