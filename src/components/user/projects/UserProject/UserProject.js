import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PanToolIcon from "@mui/icons-material/PanTool";
import ToggleButton from "@mui/material/ToggleButton";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Rank from '../../../viewer/Rank/Rank';
import Viewer from '../../../viewer/Viewer';

import './UserProject.css';

import * as api from '../../../../api/Api';

const UserProject = () => {
    const {project_id} = useParams();
    const [projectData,setProjectData] = useState(null);
    const [steps, setSteps] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [complete, setComplete] = useState(false);
    const [submitDialog, setSubmitDialog] = useState(false);

    let navigate = useNavigate();

    useEffect(async () => {
        try{
            let {data} = await api.getUserProjectDetails(project_id);
            console.log(data);

            if (data !== null){
                let {ImageIds, Questions} = data;

                let tempQuestions = Questions.map(({question_id, question, description, min, max})=>{
                    return(
                        {
                            "question_id": question_id,
                            "question": question,
                            "description": description,
                            "min": min,
                            "max": max,
                            "answer": null
                        }
                    )
                })

                console.log(typeof tempQuestions);

                let tempProjData = ImageIds.map(({image_id, image_path})=>{
                    return({
                        "project_id": project_id,
                        "image_id":image_id,
                        "image_path": `wadouri:https://imagerankerdicomtest.s3.amazonaws.com/${image_path}`,
                        "questions": JSON.parse(JSON.stringify(tempQuestions))
                    })
                })

                setProjectData(tempProjData);
                console.log('danut');
                console.log(tempProjData);
                setDataLoaded(true);
                // console.log(tempImageIds);
                // setImageData(tempImageIds);
                // setSteps(Questions);
                // await new Promise(resolve => setTimeout(resolve, 1500));
                // setDataLoaded(true);
            }

        }catch(err){
            console.log(err)
        }
    },[])

    useEffect(()=>{
        if (dataLoaded){
            setProgress(dataIndex/(projectData.length-1)*100)

            if(dataIndex === projectData.length-1){
                console.log('Complete');
                setComplete(true);
            }else{
                setComplete(false);
            }
        }

    },[dataIndex])

    const handleClose = () => {
        setSubmitDialog(false);
    }

    const handleOpen = () => {
        setSubmitDialog(true);
    }

    const handleSubmit = async () => {
        // Submit data
        try{
            let res = await api.submitProjectData(projectData);
        }catch(err){
            console.log(err);
        }
        // Confirm submission before redirect
        navigate('/user');
    }

    const SubmitDialog = () => {
        return(
            <div>
                <Dialog
                    open={submitDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Submission Confirmation
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to submit your data?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{color:'red'}}>Cancel</Button>
                        <Button onClick={handleSubmit} autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const nextData = () => {
        if(!complete){
            setDataIndex(dataIndex+1);
        }else{
            //submit data
            setSubmitDialog(true);
        }

    }

    const prevData = () => {
        setDataIndex(dataIndex-1);
    }

    const Control = () => {
        return (
            <div className={'Control'}>
                <IconButton onClick={prevData} disabled={dataIndex === 0}>
                    <NavigateBeforeIcon/>
                </IconButton>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        width:'100%',
                        alignSelf:'center',
                        '& .MuiLinearProgress-bar':{
                            backgroundColor: complete ? '#92C353' : ''
                        }
                    }} />
                <IconButton onClick={nextData}>
                    {complete ? <PublishIcon/> : <NavigateNextIcon/>}
                </IconButton>
            </div>
        )
    }

    const Viewport = () =>{
        return (
            <div className={'viewerMain'}>
                <div className={'viewer'}>
                    <Viewer imageData={projectData[dataIndex].image_path} nextData={nextData}/>
                </div>
                <div className={'rankControl'}>
                    <div className={'temp'}>
                        <ToggleButton value="Pan">
                            <PanToolIcon/>
                        </ToggleButton>
                    </div>
                    <div className={'rank'}>
                        <Rank steps={projectData[dataIndex].questions}/>
                    </div>
                    <div className={'control'}>
                        <Control/>
                    </div>
                </div>
            </div>
        )
    }

    const Loading = () => {
        return (
            <Box sx={{width:'100%'}}>
                <LinearProgress/>
            </Box>
        )
    }

    return (
        <div className={'UserProject'}>
            {dataLoaded ? <Viewport/> : <Loading/>}
            <SubmitDialog/>
        </div>
    )
}

export default UserProject;