import React from 'react'

const Step5 = ({projectForm, setProjectForm}) => {
    return(
        <div>
            <p>Project Name: {projectForm.ProjectName}</p>
            <p>Users: {projectForm.ProjectUsers.join(',')}</p>
            <p>ImageSet ID: {projectForm.ImageID}</p>
            <p>Rubric ID: {projectForm.RubricID}</p>
        </div>
    )
}

export default Step5