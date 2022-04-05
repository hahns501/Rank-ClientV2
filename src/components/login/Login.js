import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate, Link, useLocation } from 'react-router-dom';

import './Login.css'
import {login} from "../user/authSlice";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";


const Login = () => {
    const location = useLocation();
    let navigate = useNavigate()
    // const from = location.state?.from?.pathname || "/";

    const [ loading, setLoading] = useState(false)
    const { auth } = useSelector((state) => state.auth)
    const [ loginData, setLoginData ] = useState({username: '', password: ''})
    const [ testData, setTestData ] = useState({username: 'Shang', password: '12345678'})
    const [ testData2, setTestData2 ] = useState({username: 'Jank', password: '12345678'})

    const dispatch = useDispatch();

    // Form Required Validation
    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    // Redirect back if user is already logged in
    if(auth){
        console.log("Already Logged In")
    }

    // Login using redux
    const onLoginSubmit = () => {
        setLoading(true);
        dispatch(login(testData))
            .unwrap()
            .then((response) => {
                const {user, accessToken} = response
                sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
                sessionStorage.setItem('user', JSON.stringify(user))

                // Redirect based on roll
                switch(user?.role){
                    case 'admin':
                        console.log("admin");
                        navigate('/admin')
                        break;
                    case 'user':
                        console.log("user");
                        navigate('/user');
                        break;
                    default:
                        alert("Redirect Error");
                        break;
                }

                // Continues to path of navigation
                // navigate(from, {replace: true})
            })
            .catch(() => {
                setLoading(false);
            })
    }


    return (
        <div className={"loginForm"}>
            <label>Login</label>
            <input placeholder={"Username"} type={"text"} value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})}/>
            <input placeholder={"Password"} type={"text"} value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})}/>
            <Button variant={'contained'} onClick={onLoginSubmit}>Login</Button>
        </div>
    )
}

export default Login

