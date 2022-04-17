// import React from 'react'
// import Button from "@mui/material/Button";
// import {useNavigate} from 'react-router-dom'
//
// const AdminHome = () =>{
//     const navigate = useNavigate();
//
//     const goProjects = () =>{
//         navigate('projects')
//     }
//
//     return(
//         <div>
//             <h1>Admin Home</h1>
//             <Button variant={'contained'} onClick={goProjects}>Projects</Button>
//         </div>
//     )
// }
//
// export default AdminHome

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BallotIcon from '@mui/icons-material/Ballot';
import {Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const [value, setValue] = React.useState(0);

    const location = useLocation();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const initialPath = location.pathname.split('/');
        const path = initialPath[2] ?? 'admin';

        console.log(path);
        switch(path){
            case 'admin':
                setValue(0);
                break
            case 'projects':
                setValue(1);
                break
            case 'users':
                setValue(2);
                break;
            case 'rubric':
                setValue(3);
                break
            case 'test':
                setValue(4);
                break
            default:
                setValue(0);
        }
    },)

    return (
        <div className={'adminHome'}>
            <Box sx={{ width: '100%', p:0 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Navigation Tabs">
                        <Tab icon={<HomeIcon/>} iconPosition="start" label="Home" component={Link} to={'/admin'}/>
                        <Tab icon={<AssignmentIndIcon/>} iconPosition="start" label="Projects"  component={Link} to={'/admin/projects'}/>
                        <Tab icon={<PersonIcon/>} iconPosition="start" label="Users"  component={Link} to={'/admin/users'}/>
                        <Tab icon={<BallotIcon/>} iconPosition="start" label="Rubric" component={Link} to={'/admin/rubric'}/>
                        {/*<Tab label="Test" component={Link} to={'/admin/upload'} />*/}
                    </Tabs>
                </Box>
            </Box>
        </div>
    );
}
