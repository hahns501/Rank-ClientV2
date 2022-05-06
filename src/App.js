import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useNavigate  } from 'react-router-dom';
import Button from "@mui/material/Button";

import Home from "./components/home/Home"
import Login from "./components/login/Login";
import {logout} from "./components/user/authSlice";
import Layout from "./components/Layout";

import UserHome from "./components/user/UserHome";
import UserProject from "./components/user/projects/UserProject/UserProject";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/dashboard/Dashboard";
import Unauth from "./components/home/Unauth";

import ProjectDetails from "./components/admin/ProjectDetails/ProjectDetails";
import AdminLayout from "./components/admin/UploadTest/AdminLayout";
import Rubric from "./components/rubric/Rubric";
import AdminProject from "./components/admin/AdminProject";
import AdminHome from "./components/admin/AdminHome";
import AdminUsers from "./components/admin/AdminUsers/AdminUsers";
import CreateRubric from "./components/rubric/CreateRubric/CreateRubric";
import Upload from "./components/admin/UploadTest/Upload";

import './App.css'
import Registration from "./components/Registration/Registration";

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
            <div className={'Header'}>
                <h1
                    style={{
                        margin: 0,
                        fontFamily:'Montserrat, sans-serif',
                        fontSize:'2.5em',
                        // color:'white',
                    }}>
                    ImageRanker</h1>
                {auth ? <Button variant={'contained'} onClick={handleLogout}>Logout</Button>: ""}
            </div>
            <div className={'Main'}>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        {/*public routes*/}
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"login"} element={<Login/>}/>
                        <Route path={"register"} element={<Registration/>}/>
                        <Route path={"unauthorized"} element={<Unauth/>}/>

                        {/*protect routes*/}
                        <Route element={<RequireAuth allowedRoles={["user"]}/>}>
                            <Route path={"/"} element={<Dashboard/>}/>
                            <Route path={"user"} element={<UserHome/>}/>
                            <Route path={"project/:project_id"} element={<UserProject/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["admin"]}/>}>
                            <Route path={"/"} element={<Dashboard/>}/>
                            <Route path={"admin"} element={<AdminLayout/>}>
                                <Route index element={<AdminHome/>}/>
                                <Route path={"projects"} element={<AdminProject/>}/>
                                <Route path={"projects/:project_id"} element={<ProjectDetails />} />
                                <Route path={"users"} element={<AdminUsers/>}/>
                                <Route path={"rubric"} element={<Rubric/>}/>
                                <Route path={"rubric/create"} element={<CreateRubric/>}/>
                                <Route path={"image"} element={<Upload/>}/>
                            </Route>
                        </Route>

                        {/*catch all*/}
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
