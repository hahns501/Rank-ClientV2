import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import * as api from '../../../api/Api';

import Step1 from "./Forms/Step1";
import Step2 from "./Forms/Step2";
import Step3 from "./Forms/Step3";
import Step4 from "./Forms/Step4";
import Step5 from "./Forms/Step5";


const steps = ['Create Name', 'Choose Users', 'Choose Images', 'Choose Rubric', 'Confirm Details'];

const CreateProject = ({setAddProject, updateProject}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [users, setUsers] = React.useState([]);
    const [imageSets, setImageSets] = React.useState([]);
    const [rubrics, setRubrics] = React.useState([]);

    const projectInput = {
        ProjectName: '',
        ProjectUsers: [],
        ImageID: [],
        RubricID: []
    }

    const [projectForm, setProjectForm] = useState(projectInput);

    useEffect(async () => {
        try{
            // get all users
            let {data} = await api.getAllUsers();
            setUsers(data);
            console.log(data);
        }catch(err){
            console.log(err);

        }

        try{
            let {data} = await api.getImageSets();
            setImageSets(data);
            console.log(data);
        }catch(err){
            console.log(err);
        }

        try{
            let {data} = await api.getRubrics();
            setRubrics(Object.values(data));
            console.log(data);
        }catch(err){
            console.log(err);
        }
    }, [])

    const isStepOptional = (step) => {
        // return step === 1;
        return null
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        console.log(`Active Step: ${activeStep} Current: ${steps.length-1}`)

        // Submit Data
        if (activeStep === steps.length - 1){
            console.log(projectForm);
            try{
                let submitData = await api.createProject(projectForm);
                console.log(submitData);
            }catch(err){
                console.log(err)
            }

            updateProject()
        }

        // Handle Validation
        console.log(`Step: ${activeStep+1}`)
        let curStep = activeStep+1
        if (curStep === 1){
            if (projectForm.ProjectName === ''){
                alert("Add a name")
            }else{
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
            }
        }else if(curStep === 2){
            if (projectForm.ProjectUsers.length === 0){
                alert("Select atleast one user")
            }else{
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
            }
        }else if(curStep === 3){
            if (projectForm.ImageID.length === 0){
                alert("Select an image set")
            }else {
                console.log(projectForm.ImageID)
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
            }
        }else if(curStep === 4){
            if (projectForm.RubricID.length === 0){
                alert("Select a rubric")
            }else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
            }
        }else if(curStep === 5){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setProjectForm(projectInput);

        setAddProject(false);
    };

    const renderSteps = (step) => {
        switch(step) {
            case 0:
                return <Step1 projectForm={projectForm} setProjectForm={setProjectForm}/>
            case 1:
                return <Step2 projectForm={projectForm} setProjectForm={setProjectForm} rows={users}/>
            case 2:
                return <Step3 projectForm={projectForm} setProjectForm={setProjectForm} rows={imageSets}/>
            case 3:
                return <Step4 projectForm={projectForm} setProjectForm={setProjectForm} rows={rubrics}/>
            case 4:
                return <Step5 projectForm={projectForm} setProjectForm={setProjectForm}/>
            default:
                return <div>Not Found</div>
        }
    }


    return (
        <Box sx={{ px:'20%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Return</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{p:5}}>
                        {renderSteps(activeStep)}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default CreateProject