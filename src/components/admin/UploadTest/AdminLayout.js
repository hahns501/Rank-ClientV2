import React from 'react';
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import './AdminLayout.css'

const AdminLayout = () => {
    return (
        <div className={'AdminLayout'}>
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