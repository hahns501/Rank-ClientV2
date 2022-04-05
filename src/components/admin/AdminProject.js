import React, {useState} from 'react'
import {AdminProjects} from './AdminProjects';
import './AdminProjects.css';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CreateProject from "./CreateProject/CreateProject";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const AdminProject = () => {
    const [addProject, setAddProject] = useState(false)
    // const [projects, setProjects] = useState(false)

    function AdminProjectPage() {
        return (
            <div className={"AdminProjects"}>
                <Button variant={'contained'} onClick={()=>{setAddProject(!addProject)}}>Add Project</Button>
                <table id={'Projects'}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Completion</th>
                        <th>Created</th>
                    </tr>
                    </thead>
                    <tbody>
                    {AdminProjects.map((val, key) => {
                        return(
                            <tr
                                // onClick={() => {history.push('/projects/rank/' + val.ProjectID)}}
                                onClick={()=>{console.log(`Project ID:${val.ID}`)}}
                                key = {key}
                            >
                                <th>
                                    {val.Name}
                                </th>
                                <td>
                                    {/*{val.CompleteProjects}/{val.TotalProjects}*/}
                                    <Box sx={{ width: '50%' }}>
                                        <LinearProgressWithLabel value={(val.CompleteProjects/val.TotalProjects)*100} />
                                    </Box>
                                </td>
                                <td>
                                    {val.Created}
                                </td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            {addProject ? <CreateProject setAddProject={setAddProject} /> : <AdminProjectPage/>}
        </div>
    )
}

export default AdminProject