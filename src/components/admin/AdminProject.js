import React, {useEffect, useState} from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from 'react-router-dom';
import * as api from '../../api/Api'

import CreateProject from "./CreateProject/CreateProject";

import './AdminProjects.css';

// navigate('thepath', {state: {//...values}}})

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
    const [addProject, setAddProject] = useState(false);
    const [projects, setProjects] = useState([])

    let navigate = useNavigate();

    const updateProjects = async () => {
        let {data} = await api.getAllProjects();
        setProjects(Object.values(data));
    }

    const handleDelete = async (id) => {
        try{
            await api.deleteProject(id);

            updateProjects();
        }catch(err){
            console.log(err);
            alert('Delete Error')
        }
    }

    useEffect(async()=>{
        let {data} = await api.getAllProjects();
        setProjects(Object.values(data));
        console.log('Effect in AdminProject')
    },[])


    function AdminProjectPage() {
        return (
            <div className={"AdminProjects"}>
                <Button variant={'contained'} onClick={()=>{setAddProject(!addProject)}}>Add Project</Button>
                <table id={'Projects'}>
                    <thead>
                    <tr>
                        <th width={'40%'}>Name</th>
                        <th width={'40%'}>Completion</th>
                        <th width={'20%'}>Created</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((val, key) => {
                        return(
                            <tr
                                // onClick={() => {history.push('/projects/rank/' + val.ProjectID)}}
                                onClick={()=>{navigate(`/admin/projects/${val.project_id}`, {state: {val}})}}
                                key = {key}
                            >
                                <th>
                                    {val.project_name}
                                </th>
                                <td>
                                    {/*{val.CompleteProjects}/{val.TotalProjects}*/}
                                    <Box sx={{ width: '50%' }}>
                                        {/*<LinearProgressWithLabel value={(val.CompleteProjects/val.TotalProjects)*100} />*/}
                                        <LinearProgressWithLabel value={0} />
                                    </Box>
                                </td>
                                <td>
                                    {val.created_at.substring(0, val.created_at.indexOf('T'))}
                                </td>
                                <td>
                                    <IconButton
                                        onClick={() => handleDelete(val.project_id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
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
            {addProject ? <CreateProject setAddProject={setAddProject} updateProject={updateProjects} /> : <AdminProjectPage/>}
        </div>
    )
}

export default AdminProject