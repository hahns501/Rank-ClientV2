import React from 'react';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../../images/homeBackground.jpg'

import './Home.css'

const Home = () => {
    let navigate = useNavigate()

    return (
        <div className={'HomePage'}>
            <div className={'HomeMain'}>
                <div className={'HomeLeft'}>
                    <div className={'Title'}>
                        <h1>ImageRanker Capstone Project</h1>
                        <h2>Group 12</h2>
                    </div>
                    <div className={'HomeLogin'}>
                        <Button
                            sx={{
                                color:'black',
                                backgroundColor:'white',
                                fontFamily:'Montserrat, sans-serif',
                                fontSize:'1em',
                                fontWeight: 'bold',
                                ':hover': {
                                    outline: 'white solid',
                                    bgcolor: 'black', // theme.palette.primary.main
                                    color: 'white',
                                },
                            }}
                            onClick={() => {navigate('/login')}}
                            variant={'contained'}
                        >
                            Login
                        </Button>
                    </div>
                </div>
                <div className={'HomeRight'}>
                    <img src={backgroundImage} alt="Logo" />
                </div>
            </div>
        </div>
    )
}

export default Home