import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Registration.css';

import { useNavigate, Link, useLocation } from 'react-router-dom';

import * as api from '../../api/Api'

const Registration = () => {
    const [ registerData, setRegisterData ] = useState({email:'', fName: '', lName: '', password: '',occupation: '', yearsExp: 0, passwordCheck: '', role:'default'})
    const [ yearsExpError, setYearsExpError] = useState(false);
    const [ validate, setValidate] = useState(true);
    let navigate = useNavigate()

    useEffect(()=>{
        if(registerData.yearsExp < 0 || registerData.yearsExp > 100){
            setYearsExpError(true);
            setValidate(false);
        }else{
            setYearsExpError(false);
            setValidate(true);
        }
    },[registerData])

    const handleSubmit = async () =>{
        if(registerData.email === ''){
            alert('Email cannot be blank');
        }else if(registerData.password !== registerData.passwordCheck){
            alert('Passwords do not match');
        }else if(registerData.fName === '' || registerData.lName === ''){
            alert('First or last name cannot be blank');
        }else if(registerData.occupation === ''){
            alert('Occupation cannot be blank');
        }else if(registerData.role === 'default'){
            alert('Choose a role');
        }else{
            try{
                let res = await api.registerUser(registerData);
                navigate('/login')
            }catch(err){
                alert(err);
                console.log(err);
            }
        }
    }

    return (
        <div className={'register'}>
            <h1>Registration</h1>
            <TextField
                variant={'outlined'}
                label={"Email"}
                margin={"normal"}
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
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
                margin={"normal"}
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
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
                label={"Confirm Password"}
                margin={"normal"}
                value={registerData.passwordCheck}
                onChange={(e) => setRegisterData({...registerData, passwordCheck: e.target.value})}
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
            <div className={'name'}>
                <TextField
                    variant={'outlined'}
                    label={"First Name"}
                    fullWidth
                    margin={"normal"}
                    value={registerData.fName}
                    onChange={(e) => setRegisterData({...registerData, fName: e.target.value})}
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
                    label={"Last Name"}
                    margin={"normal"}
                    value={registerData.lName}
                    fullWidth
                    onChange={(e) => setRegisterData({...registerData, lName: e.target.value})}
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
            </div>
            <div className={'occupation'}>
                <TextField
                    variant={'outlined'}
                    label={"Occupation"}
                    margin={"normal"}
                    value={registerData.occupation}
                    fullWidth
                    onChange={(e) => setRegisterData({...registerData, occupation: e.target.value})}
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
                    label={"Years of Experience"}
                    margin={"normal"}
                    type={'number'}
                    error={yearsExpError}
                    value={registerData.yearsExp}
                    onChange={(e) => setRegisterData({...registerData, yearsExp: e.target.value})}
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

            </div>

            <FormControl fullWidth sx={{marginTop:'20px'}}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={registerData.role}
                    label="Role"
                    onChange={(e) => setRegisterData({...registerData, role: e.target.value})}
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
                >
                    <MenuItem value={'default'}>Choose a role</MenuItem>
                    <MenuItem value={'user'}>User</MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                </Select>
            </FormControl>

            <Button
                sx={{':hover': {
                        outline: 'black solid',
                        bgcolor: 'white', // theme.palette.primary.main
                        color: 'black',
                    }}}
                variant={'contained'}
                onClick={handleSubmit}
            >
                Register
            </Button>
        </div>
    )
}

export default Registration