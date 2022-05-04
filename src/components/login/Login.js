import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate, Link, useLocation } from 'react-router-dom';

import './Login.css'
import {login} from "../user/authSlice";
import {ThemeProvider, styled} from "@mui/material/styles";
import theme from '../../theme'

import TextField from '@mui/material/TextField';
// const

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


    useEffect(()=>{
        if(auth){
            const user = JSON.parse(sessionStorage.getItem("user"));
            if(user?.role === 'user'){
                navigate('/user');
            }else{
                navigate('/admin');
            }
        }
    },[auth])


    // Login using redux
    const onLoginSubmit = () => {
        setLoading(true);
        dispatch(login(loginData))
            .unwrap()
            .then((response) => {
                const {user, accessToken} = response;
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
            <h1>Login</h1>
            <TextField
                variant={'outlined'}
                label={"Username"}
                margin={"normal"}
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                sx={{
                    backgroundColor: 'white',
                    '& label.Mui-focused':{
                        color: 'black',
                    },
                    '& .MuiOutlinedInput-root':{
                        '&.Mui-focused fieldset':{
                            borderColor: 'black',
                        },
                        '&:hover fieldset': {
                            // borderColor: 'yellow',
                        },
                    },
                }}
            />
            <TextField
                variant={'outlined'}
                label={"Password"}
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                sx={{
                    backgroundColor: 'white',
                    '& label.Mui-focused':{
                        color: 'black',
                    },
                    '& .MuiOutlinedInput-root':{
                        '&.Mui-focused fieldset':{
                            borderColor: 'black',
                        },
                        '&:hover fieldset': {
                            // borderColor: 'yellow',
                        },
                    },
                }}
            />
            <Button
                sx={{':hover': {
                        outline: 'black solid',
                        bgcolor: 'white', // theme.palette.primary.main
                        color: 'black',
                    }}}
                variant={'contained'}
                onClick={onLoginSubmit}
            >
                Login
            </Button>
        </div>
    )
}

export default Login

