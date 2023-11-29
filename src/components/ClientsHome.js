//This is a Sample Redux Component
import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { Box, Divider } from "@mui/material";
import DetailsLayout from "./DetailsLayout";

function ClientsComponent() {
    return (
        <>
            <Divider orientation="vertical" variant="middle" flexItem />
            <DetailsLayout />
        </>
    );
}

export default ClientsComponent;
