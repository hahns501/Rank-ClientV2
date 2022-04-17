import React from 'react';
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const AdminLayout = () => {
    return (
        <div>
            <NavBar/>
            <main>
                <Box sx={{m:2}}>
                    <Outlet/>
                </Box>
            </main>
        </div>
    )
}

export default AdminLayout;