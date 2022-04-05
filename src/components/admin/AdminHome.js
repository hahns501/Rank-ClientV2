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

import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BallotIcon from '@mui/icons-material/Ballot';
import Button from "@mui/material/Button";

import AdminProject from "./AdminProject";
import Rubric from "../rubric/Rubric";
import Upload from "./UploadTest/Upload";

import * as api from '../../api/Api'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const testSub = async () => {
    try{
        let {data} = await api.getUserProjects();
        console.log(data);
    }catch(err){
        console.log(err);
    }
}

export default function AdminHome() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', p:0 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab icon={<HomeIcon/>} iconPosition="start" label="Home" {...a11yProps(0)} />
                    <Tab icon={<AssignmentIndIcon/>} iconPosition="start" label="Projects" {...a11yProps(1)} />
                    <Tab icon={<PersonIcon/>} iconPosition="start" label="Users" {...a11yProps(2)} />
                    <Tab icon={<BallotIcon/>} iconPosition="start" label="Rubric" {...a11yProps(3)} />
                    <Tab label="Test" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Button variant={'contained'} onClick={testSub}>Test</Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AdminProject/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Show Users
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Rubric/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Upload/>
            </TabPanel>
        </Box>
    );
}
