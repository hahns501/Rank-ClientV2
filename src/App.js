import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useNavigate  } from 'react-router-dom';
import Button from "@mui/material/Button";

import Home from "./components/home/Home"
import Login from "./components/login/Login";
import useToken from "./hooks/useToken";
import {logout} from "./components/user/authSlice";
import Layout from "./components/Layout";
import AdminHome from "./components/admin/AdminHome";
import UserHome from "./components/user/UserHome";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/dashboard/Dashboard";
import Unauth from "./components/home/Unauth";
import CreateRubric from "./components/admin/CreateRubric";
import Rubric from "./components/rubric/Rubric";
import AdminProject from "./components/admin/AdminProject";

const App = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { auth } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.auth)

    // if(!token){
    //     console.log(token)
    //     return <Login setToken={setToken}/>
    // }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="App">
            {auth ? <Button onClick={handleLogout}>Logout</Button> : ""}
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
                        <Route path={"admin"} element={<AdminHome/>}/>
                        <Route path={"rubric"} element={<Rubric/>}/>
                        <Route path={"admin/projects"} element={<AdminProject/>}/>
                    </Route>

                    {/*catch all*/}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
