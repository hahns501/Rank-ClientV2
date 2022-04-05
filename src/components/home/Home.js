import React from 'react';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate()

    return (
        <div>
            <h1>Home Page</h1>
            <Button onClick={() => {navigate('/login')}} variant={'contained'}>Login</Button>
        </div>
    )
}

export default Home