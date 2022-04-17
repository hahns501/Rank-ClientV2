import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useNavigate  } from 'react-router-dom';
import Button from "@mui/material/Button";

import Home from "./components/home/Home"
import Login from "./components/login/Login";
import {logout} from "./components/user/authSlice";
import Layout from "./components/Layout";
import Box from '@mui/material/Box';

import UserHome from "./components/user/UserHome";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/dashboard/Dashboard";
import Unauth from "./components/home/Unauth";
import CreateRubricQuestion from "./components/rubric/CreateRubric/CreateRubricQuestion";

import ProjectDetails from "./components/admin/ProjectDetails/ProjectDetails";
import AdminLayout from "./components/admin/UploadTest/AdminLayout";
import Rubric from "./components/rubric/Rubric";
import AdminProject from "./components/admin/AdminProject";
import AdminHome from "./components/admin/AdminHome";
import AdminUsers from "./components/admin/AdminUsers/AdminUsers";

import * as api from './api/Api'

const App = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { auth } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="App">
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 style={{margin: 0}}>Image Ranker</h1>
                {auth ? <Button variant={'contained'} onClick={handleLogout}>Logout</Button>: ""}
            </Box>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    {/*public routes*/}
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"unauthorized"} element={<Unauth/>}/>

                    {/*protect routes*/}
                    <Route element={<RequireAuth allowedRoles={["user"]}/>}>
                        <Route path={"/"} element={<Dashboard/>}/>
                        <Route path={"user"} element={<UserHome/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["admin"]}/>}>
                        <Route path={"/"} element={<Dashboard/>}/>
                        <Route path={"admin"} element={<AdminLayout/>}>
                            <Route index element={<AdminHome/>}/>
                            <Route path={"projects"} element={<AdminProject/>}/>
                            <Route path={"projects/:project_id"} element={<ProjectDetails />} />
                            <Route path={"users"} element={<AdminUsers/>}/>
                            <Route path={"rubric"} element={<Rubric/>}/>
                        </Route>
                    </Route>

                    {/*catch all*/}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
