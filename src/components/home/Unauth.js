import React from 'react'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const Unauth = () => {
    const navigate = useNavigate();

    const handleBack = () =>[
        navigate(-1)
    ]

    return(
        <div>
            <h1> You are not authorized to view this</h1>
            <Button variant={"contained"} onClick={handleBack}>Back</Button>
        </div>
    )
}

export default Unauth