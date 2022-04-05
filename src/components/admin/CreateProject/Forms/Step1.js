import React from 'react'
import {TextField} from "@mui/material";

const Step1 = ({projectForm, setProjectForm}) => {
    return(
        <div>
            <TextField
                id={"projectName"}
                variant={"outlined"}
                label={"Project Name"}
                value={projectForm.ProjectName}
                onChange={(e)=>{setProjectForm({...projectForm, ProjectName:e.target.value})}}
            />
        </div>
    )
}

export default Step1