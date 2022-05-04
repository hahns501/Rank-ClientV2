import React from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ColoredCircle from "../../user/projects/ColoredCircle";
import './ProjectDetails.css'

const ProjectDetails = () => {
    const {project_id} = useParams();
    const { state: {val} } = useLocation();
    const navigate = useNavigate();

    const statusColor = (status) => {
        if (status){
            return (
                <div>
                    <ColoredCircle color={"#92C353"}/> Complete
                </div>
            )
        }else{
            return (
                <div>
                    <ColoredCircle color={"#febe10"}/> Incomplete
                </div>
            )
        }
    }

    return (
        <div>
            <Box>
                <Button
                    variant={'contained'}
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <h1>Project Details</h1>
            </Box>

            <h2>Project Name: {val.project_name} </h2>
            <h2>Rubric: {val.rubric_title}</h2>
            <h2>Image Set: {val.image_set_name}</h2>
            <h2>Users:</h2>
            <table id={'users'}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
            <tbody>
            {val.users.map((user) => {
                return (
                    <tr key={user.user_id}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{statusColor(user.status)}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        </div>
    )
}

export default ProjectDetails;